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
    const lightTheme = createTheme(inputJSON, "light");
    const darkTheme = createTheme(inputJSON, "dark");

    // Write the light theme JSON to brand.json5
    let outputFilePath = `${folderPath}brand.json5`;
    fs.writeFile(outputFilePath, JSON.stringify(lightTheme, null, 2), (err) => {
      if (err) {
        console.error("Error writing light theme file:", err);
      } else {
        console.log(
          `Light theme - Transformation successful: ${outputFilePath}`
        );
      }
    });

    // Write the dark theme JSON to brand.dark.json5
    outputFilePath = `${folderPath}brand.dark.json5`;
    fs.writeFile(outputFilePath, JSON.stringify(darkTheme, null, 2), (err) => {
      if (err) {
        console.error("Error writing dark theme file:", err);
      } else {
        console.log(
          `Dark theme - Transformation successful: ${outputFilePath}`
        );
      }
    });
  } catch (err) {
    console.error("Error parsing input JSON:", err);
  }
});

function createTheme(input, themeType) {
  const theme = {
    color: {
      brand: {
        main: {},
      },
    },
  };

  const brandPalette = input.color["brand palette"];

  const mainCategories = Object.keys(input.color[themeType]);

  for (const category of mainCategories) {
    if (!theme.color.brand[category]) {
      theme.color.brand[category] = {};
    }

    const categoryKeys = Object.keys(input.color[themeType][category]);

    for (const key of categoryKeys) {
      const item = input.color[themeType][category][key];
      const description = item.description || key;
      const originalHexValue = item.value.toLowerCase();

      // Find the corresponding brand palette key based on the original hex value
      const paletteKey = Object.keys(brandPalette).find((paletteKey) => {
        return (
          brandPalette[paletteKey].value.toLowerCase() === originalHexValue
        );
      });

      if (!paletteKey) {
        console.error(
          `Error: Original hex value "${originalHexValue}" does not correspond to any brand palette color value.`
        );
        process.exit(1);
      }

      const value = `{color.core.${paletteKey
        .toLowerCase()
        .replace(" ", ".")}}`;

      theme.color.brand[category][camelCase(key)] = {
        value: value,
        type: "color",
        description: description,
      };
    }
  }

  return theme;
}

function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, "");
}
