const fs = require("fs");
const path = require("path");

// read brand folder
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

fs.writeFileSync(
  `./tokens/${brand}/asset/icons.json5`,
  JSON.stringify({ asset }, null, 2)
);
