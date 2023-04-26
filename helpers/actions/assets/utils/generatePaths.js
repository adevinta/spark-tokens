const fs = require("fs");
const path = require("path");

// read brand folder
const brand = process.argv[2] || "spark";
const imageDir = `./assets/${brand}/icons`;

const image = {};

fs.readdirSync(imageDir).forEach((file) => {
  const ext = path.extname(file);
  if (ext === ".svg") {
    const name = path.basename(file, ext);
    image[name] = { value: path.join(imageDir, file) };
  }
});

fs.writeFileSync(
  `./tokens/${brand}/asset/icons.json5`,
  JSON.stringify({ image }, null, 2)
);
