const fs = require("fs");
const path = require("path");

// Load clean up script
const { cleanSVGsInInputDirectory } = require("./cleanUpSVGIcons");

// Load checkers
const { findLonelyVariants } = require("./iconNamingValidator");
const { checkForDuplicateSVGs } = require("./SVGDuplicateChecker");
const { checkSVGCentering } = require("./checkSVGCentering");

// Read brand folder
const brand = process.argv[2] || "spark";
const brandAssetsDir = `./assets/${brand}/`;
const assetDir = `${brandAssetsDir}/icons`;
const tempAssetDir = `${brandAssetsDir}/temp-icons`;

// Execute the clean up script on new icons
cleanSVGsInInputDirectory(tempAssetDir, assetDir);

const asset = {};

fs.readdirSync(assetDir).forEach((file) => {
  const ext = path.extname(file);
  if (ext === ".svg") {
    const name = path.basename(file, ext);
    asset[name] = { value: path.join(assetDir, file) };
  }
});

const outputFilePath = `./tokens/${brand}/asset/icons.json5`;
fs.writeFileSync(outputFilePath, JSON.stringify({ asset }, null, 2));

console.log(
  `Icons - List of icon files generated successfully: ${outputFilePath}`
);

// Find and display lonely variants
const inputPath = assetDir;
const files = fs.readdirSync(inputPath);
const lonelyVariants = findLonelyVariants(files);

if (lonelyVariants.length > 0) {
  console.error("Icons - Lonely variants found:", lonelyVariants);
} else {
  console.log("Icons - All icon variants have matching pairs!");
}

// Check for duplicate SVGs
checkForDuplicateSVGs(assetDir, files);

// Check SVG centering
files.forEach((file) => {
  if (path.extname(file) === ".svg") {
    const centeredMessage = checkSVGCentering(inputPath, file);
    if (centeredMessage) {
      console.log(`Icons - ${file} is ${centeredMessage}`);
    }
  }
});
