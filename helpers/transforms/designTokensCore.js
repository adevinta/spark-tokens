const fs = require("fs");
const folderPath = "../../tokens/spark/color/";

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
    fs.writeFile(
      `${folderPath}core.json5`,
      JSON.stringify(outputJSON, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing output file:", err);
        } else {
          console.log("Transformation successful. Output saved to output.json");
        }
      }
    );
  } catch (err) {
    console.error("Error parsing input JSON:", err);
  }
});

function transformJSON(input) {
  const output = {
    color: {
      core: {
        b_w: {},
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
        output.color.core.b_w[colorName] = {
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
