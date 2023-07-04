const fs = require("fs-extra");
const optimize = require("./utils/optimize.js");

/**
 * This is a custom [Style Dictionary action](https://amzn.github.io/style-dictionary/#/actions)
 * that will generate all of the graphics for each platform (android, ios, web) based on
 * the SVG tokens defined in our Style Dictionary.
 */
module.exports = {
  // An action in Style Dictionary has `do` and `undo` functions, which take the transformed
  // and resolved dictionary object containing all the tokens and the platform configuration
  // of the platform that called this action.
  do: (dictionary, config) => {
    const { iconPath } = config;

    dictionary.allProperties
      .filter((token) => {
        return token.attributes.category === `asset`;
      })
      .forEach((token) => {
        const { name, value } = token;

        // Read source
        const svg = fs.readFileSync(value);

        // Handle flags differently
        const isCountryFlag = /^Flag[A-Z]{2}$/.test(name);
        const svgFill = isCountryFlag ? "none" : "currentColor";

        // Optimize SVGs for web
        const optimizedSvg = optimize(svg, {
          attributes: [{ fill: svgFill }, { stroke: "none" }],
          title: name,
          isCountryFlag,
        });

        // Check that the icon is 24x24
        if (!optimizedSvg.startsWith(`<svg viewBox="0 0 24 24"`)) {
          console.error(
            `❌ Invalid viewBox for ${name}.svg. Expected "0 0 24 24". Skipped`
          );
          return;
        }

        // Make sure the directory exists and write the new SVG file
        const outputPath = `${iconPath || ""}${name}.svg`;
        fs.ensureFileSync(outputPath);
        fs.writeFileSync(outputPath, optimizedSvg);
        console.log(`✔︎  ${outputPath}`);
      });
  },

  undo: (dictionary, config) => {
    // no clean action
  },
};
