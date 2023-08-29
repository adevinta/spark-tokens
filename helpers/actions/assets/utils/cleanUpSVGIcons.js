const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const parseString = xml2js.parseString;

function cleanSVG(inputPath, outputPath) {
  fs.readFile(inputPath, "utf8", (err, data) => {
    if (err) {
      console.error(`Icons - Error reading file ${inputPath}: ${err}`);
      return;
    }

    parseString(data, (err, result) => {
      if (err) {
        console.error(`Icons - Error parsing SVG: ${err}`);
        return;
      }

      if (!result.svg) {
        console.error(`Icons - Invalid SVG format in ${inputPath}`);
        return;
      }

      const viewBox = result.svg.$.viewBox || "0 0 24 24";
      let paths = result.svg.path || [];

      if (
        result.svg.g &&
        result.svg.g[0].$ &&
        result.svg.g[0].$["clip-path"] &&
        result.svg.g[0].path
      ) {
        const pathInsideGroup = result.svg.g[0].path[0];
        if (pathInsideGroup.$ && pathInsideGroup.$.d) {
          paths = [{ $: { d: pathInsideGroup.$.d } }];
        }
      }

      const newPaths = paths
        .filter((pathElement) => !pathElement.mask)
        .map((pathElement) => {
          const newPath = { $: {} };
          if (pathElement.$["fill-rule"]) {
            newPath.$["fill-rule"] = pathElement.$["fill-rule"];
          }
          newPath.$.d = pathElement.$.d;
          return newPath;
        });

      const newSVG = {
        svg: {
          $: {
            viewBox,
            xmlns: "http://www.w3.org/2000/svg",
          },
          path: newPaths,
        },
      };

      const builder = new xml2js.Builder();
      const cleanData = builder
        .buildObject(newSVG)
        .replace(/<\?xml.*\?>\n/, "");

      fs.writeFile(outputPath, cleanData, "utf8", (err) => {
        if (err) {
          console.error(
            `Icons - Error writing cleaned SVG to ${outputPath}: ${err}`
          );
          return;
        }
        console.log(`Icons - Cleaned SVG saved to ${outputPath}`);
      });
    });
  });
}

function cleanSVGsInInputDirectory(inputFolder, outputFolder) {
  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error(`Icons - Error reading directory ${inputFolder}: ${err}`);
      return;
    }

    files.forEach((file) => {
      const inputPath = path.join(inputFolder, file);
      const outputPath = path.join(outputFolder, file);

      if (path.extname(inputPath).toLowerCase() === ".svg") {
        const existingOutputPath = path.join(outputFolder, file);
        if (fs.existsSync(existingOutputPath)) {
          cleanSVG(inputPath, existingOutputPath);
        }
      }
    });
  });
}

module.exports = {
  cleanSVGsInInputDirectory,
};
