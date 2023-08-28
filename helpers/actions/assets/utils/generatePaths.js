const fs = require("fs");
const path = require("path");

// Load checkers
const iconNamingValidator = require("./iconNamingValidator");
const svgDuplicateChecker = require("./SVGDuplicateChecker");

// Read brand folder
const brand = process.argv[2] || "spark";
const assetDir = `./assets/${brand}/icons`;

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
const lonelyVariants = iconNamingValidator.findLonelyVariants(files);

if (lonelyVariants.length > 0) {
  console.error("Icons - Lonely variants found:", lonelyVariants);
} else {
  console.log("Icons - All icon variants have matching pairs!");
}

// Check for duplicate SVGs
svgDuplicateChecker.checkForDuplicateSVGs(assetDir, files);
