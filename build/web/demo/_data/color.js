const tokens = require("spark-tokens/build/web/dist/tokens.json");

// Hard-coding which tokens to show in the doc site
// just so that the line up (appear in the same order) and are grouped nicely
const colors = [
  "primary",
  "secondary",
  "success",
  "alert",
  "error",
  "info",
  "neutral",
];

module.exports = {
  brand: colors.map((s) => `color-brand-${s}`),
};
