const fs = require("fs");
const path = require("path");

// read brand folder
const brand = process.argv[2] || "spark";
const iconsDir = `./assets/${brand}/icons`;

const icons = {};

fs.readdirSync(iconsDir).forEach((file) => {
  const ext = path.extname(file);
  if (ext === ".svg") {
    const name = path.basename(file, ext);
    icons[name] = { value: path.join(iconsDir, file) };
  }
});

fs.writeFileSync(
  `./tokens/${brand}/asset/icons.json5`,
  JSON.stringify({ icons }, null, 2)
);
