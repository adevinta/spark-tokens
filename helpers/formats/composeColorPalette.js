/**
 * This formatter creates a ColorPalette class containing all the `global`
 * colours. (ie the non-themed ones).
 */
module.exports = function ({ dictionary, options }) {
  return `package ${options.packageName || "com.adevinta.spark.tokens"}

import androidx.compose.ui.graphics.Color

@Suppress("unused")
internal object ${options.className || "PaletteTokens"} {
${getColorsAsPropertyDefinitions(dictionary)}
}
`;
};

function getColorsAsPropertyDefinitions(dictionary) {
  return dictionary.allProperties
    .map((token) => {
      return "\t" + getColorAsPropertyDefinition(token);
    })
    .join("\n");
}

function getColorAsPropertyDefinition(token) {
  return `internal val ${token.name.slice(9)}: Color = ${token.value}`;
}
