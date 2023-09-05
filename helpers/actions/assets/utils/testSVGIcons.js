const fs = require("fs");
const path = require("path");
const { findLonelyVariants } = require("./iconNamingValidator");
const { checkForDuplicateSVGs } = require("./SVGDuplicateChecker");
const { checkSVGCentering } = require("./checkSVGCentering");
const {
  checkSVGDecimalPrecision,
  spotSVGsWithMasks,
  spotUnwantedClipPath,
  checkSVGTopDefinition,
  spotUnwantedFillAttributes,
} = require("./SVGPropertyChecker");

// Read brand folder
const brand = process.argv[2] || "spark";
const brandAssetsDir = `./assets/${brand}/`;
const assetDir = `${brandAssetsDir}/icons`;

// Find and display lonely variants
const inputPath = assetDir;
const files = fs.readdirSync(inputPath);
const lonelyVariants = findLonelyVariants(files);
if (lonelyVariants.length > 0) {
  console.error("Icons - Lonely variants found:", lonelyVariants);
}

// Check for duplicate SVGs
checkForDuplicateSVGs(assetDir, files);

// Check SVG properties for each SVG file
files.forEach((file) => {
  if (path.extname(file) === ".svg") {
    const filePath = path.join(inputPath, file);

    checkSVGDecimalPrecision(filePath);
    spotSVGsWithMasks(filePath);
    spotUnwantedClipPath(filePath);
    checkSVGTopDefinition(filePath);
    spotUnwantedFillAttributes(filePath);

    const centeredMessage = checkSVGCentering(inputPath, file);
    if (centeredMessage) {
      console.log(`Icons - ${file} is ${centeredMessage}`);
    }
  }
});
