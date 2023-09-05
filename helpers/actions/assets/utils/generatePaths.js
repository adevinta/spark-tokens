const fs = require("fs");
const path = require("path");

// Load clean up script
const { cleanSVGsInInputDirectory } = require("./cleanUpSVGIcons");

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
