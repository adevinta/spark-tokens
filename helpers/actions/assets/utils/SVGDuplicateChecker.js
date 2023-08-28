const fs = require("fs");
const crypto = require("crypto");

// Function to generate a hash for a given string
function generateHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function checkForDuplicateSVGs(svgDirectory, files) {
  // Store hashes and filenames
  const hashToFile = new Map();

  files.forEach((file) => {
    if (file.endsWith(".svg")) {
      const filePath = `${svgDirectory}/${file}`;
      const svgContent = fs.readFileSync(filePath, "utf8");
      const hash = generateHash(svgContent);

      if (hashToFile.has(hash)) {
        console.log(
          `Icons - Duplicate SVG found: ${file} and ${hashToFile.get(hash)}`
        );
      } else {
        hashToFile.set(hash, file);
      }
    }
  });
}

module.exports = {
  checkForDuplicateSVGs,
};
