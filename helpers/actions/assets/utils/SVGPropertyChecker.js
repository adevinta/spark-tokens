const fs = require("fs");

// Check Number of Decimals (2) in SVG
function checkSVGDecimalPrecision(filePath) {
  const svgContent = fs.readFileSync(filePath, "utf8");
  const decimalRegex = /\d+\.\d{3,}/g; // Matches numbers with more than 2 decimal places
  const matches = svgContent.match(decimalRegex);
  if (matches) {
    console.error(
      `Icons - ${filePath} has SVG coordinates with excessive decimal places.`
    );
  }
}

// Spot Icons Including Masks (Not Supported by iOS)
function spotSVGsWithMasks(filePath) {
  const svgContent = fs.readFileSync(filePath, "utf8");
  if (svgContent.includes("<mask")) {
    console.error(
      `Icons - ${filePath} includes a mask element, which may not be fully supported by iOS.`
    );
  }
}

// Spot Unwanted clip-path Attributes
function spotUnwantedClipPath(filePath) {
  const svgContent = fs.readFileSync(filePath, "utf8");
  if (svgContent.includes("clip-path")) {
    console.error(
      `Icons - ${filePath} includes a clip-path attribute, which might not be desired.`
    );
  }
}

// Check Inconsistencies in the <svg> Top Definition
function checkSVGTopDefinition(filePath) {
  const svgContent = fs.readFileSync(filePath, "utf8");
  if (
    !svgContent.includes(
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
    )
  ) {
    console.error(`Icons - ${filePath} has inconsistent <svg> top definition.`);
  }
}

// Spot Unwanted fill Attributes
function spotUnwantedFillAttributes(filePath) {
  const svgContent = fs.readFileSync(filePath, "utf8");
  const fillRegex = /fill=["'](#\w+|rgba?\(.+?\)|\w+)["']/g;
  const matches = svgContent.match(fillRegex);

  if (matches) {
    console.error(`Icons - ${filePath} includes unwanted fill attributes.`);
    matches.forEach((match) => {
      console.error(`  - ${match}`);
    });
  }
}

module.exports = {
  checkSVGDecimalPrecision,
  spotSVGsWithMasks,
  spotUnwantedClipPath,
  spotUnwantedFillAttributes,
  checkSVGTopDefinition,
};
