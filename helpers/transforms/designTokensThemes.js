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
      brand: {},
    },
  };

  const brandPalette = input.color["brand palette"];

  const mainCategories = Object.keys(input.color[themeType]);

  for (const category of mainCategories) {
    if (category.toLowerCase() === "dim") {
      continue; // Skip the "dim" category
    }

    const categoryCamelCase = camelCase(category);
    theme.color.brand[categoryCamelCase] = {};

    const categoryKeys = Object.keys(input.color[themeType][category]);

    for (const key of categoryKeys) {
      const item = input.color[themeType][category][key];
      const description = item.description || key;
      const originalHexValue = item.value.toLowerCase();

      const value =
        key === "overlay"
          ? originalHexValue // we don't handle opacity yet
          : `{color.core.${getPaletteKey(originalHexValue, brandPalette)}}`;

      theme.color.brand[categoryCamelCase][camelCase(key)] = {
        value: value,
        type: "color",
        description: description,
      };
    }
  }

  return theme;
}

function getPaletteKey(hexValue, brandPalette) {
  const paletteKey = Object.keys(brandPalette).find((key) => {
    return brandPalette[key].value.toLowerCase() === hexValue;
  });

  if (!paletteKey) {
    console.error(
      `Error: Original hex value "${hexValue}" does not correspond to any brand palette color value.`
    );
    process.exit(1);
  }

  return paletteKey.toLowerCase().replace(" ", ".");
}

function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, "");
}
