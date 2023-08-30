const fs = require("fs");
const { registerWindow, SVG } = require("@svgdotjs/svg.js");
const { createSVGWindow } = require("svgdom");

function checkSVGCentering(inputFolderPath, inputFilename) {
  const svgFileContent = fs.readFileSync(
    `${inputFolderPath}/${inputFilename}`,
    "utf-8"
  );

  const window = createSVGWindow();
  const { document } = window;
  registerWindow(window, document);

  const rootSvg = SVG(svgFileContent);

  // Calculate the bounding box of the whole SVG
  const svgBoundingBox = rootSvg.bbox();
  const svgCenterX = svgBoundingBox.cx;
  const svgCenterY = svgBoundingBox.cy;

  // Get the current viewBox attribute value (if available)
  const viewBoxAttr = rootSvg.attr("viewBox");
  const viewBox = viewBoxAttr
    ? viewBoxAttr.split(" ").map(Number)
    : [0, 0, 24, 24];

  // Calculate the translation values to center the SVG's center
  const centerX = viewBox[2] / 2 - svgCenterX;
  const centerY = viewBox[3] / 2 - svgCenterY;

  // Check if the SVG is horizontally centered, vertically centered, or both
  const isHorizontallyCentered = Math.abs(centerX) < 0.5;
  const isVerticallyCentered = Math.abs(centerY) < 0.5;

  // Generate the centered message
  let centeredMessage = "";
  if (!isHorizontallyCentered && !isVerticallyCentered) {
    centeredMessage = `not centered (horizontally: ${centerX.toFixed(
      2
    )}, vertically: ${centerY.toFixed(2)})`;
  } else if (!isHorizontallyCentered) {
    centeredMessage = `not centered (horizontally: ${centerX.toFixed(2)})`;
  } else if (!isVerticallyCentered) {
    centeredMessage = `not centered (vertically: ${centerY.toFixed(2)})`;
  }

  return centeredMessage;
}

module.exports = { checkSVGCentering };
