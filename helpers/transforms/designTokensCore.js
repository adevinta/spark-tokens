const fs = require("fs");

// Read brand folder
const brand = process.argv[2] || "spark";
const folderPath = `./tokens/${brand}/color/`;

// Read the input JSON file
fs.readFile(`${folderPath}figmaTokens.json`, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading input file:", err);
    return;
  }

  try {
    const inputJSON = JSON.parse(data);
    const outputJSON = transformJSON(inputJSON);

    // Write the output JSON to a new file
    const outputFile = `${folderPath}core.json5`;

    fs.writeFile(outputFile, JSON.stringify(outputJSON, null, 2), (err) => {
      if (err) {
        console.error("Error writing output file:", err);
      } else {
        console.log(`Core Palette - Transformation successful: ${outputFile}`);
      }
    });
  } catch (err) {
    console.error("Error parsing input JSON:", err);
  }
});

function transformJSON(input) {
  const output = {
    color: {
      core: {
        social: {},
      },
    },
  };

  const palette = input.color["brand palette"];
  for (const key in palette) {
    const item = palette[key];
    const [colorName, shade] = key.toLowerCase().split(" ");

    if (!shade) {
      if (colorName === "black" || colorName === "white") {
        output.color.core[colorName] = {
          value: item.value.toUpperCase(),
          type: item.type,
          description: item.description || key,
        };
      } else {
        output.color.core.social[key] = {
          value: item.value.toUpperCase(),
          type: item.type,
          description: item.description || key,
        };
      }
    } else {
      output.color.core[colorName] = output.color.core[colorName] || {};
      output.color.core[colorName][shade] = {
        value: item.value.toUpperCase(),
        type: item.type,
        description: item.description || key,
      };
    }
  }

  return output;
}
