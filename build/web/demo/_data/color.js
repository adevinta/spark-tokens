const tokens = require("spark-tokens/build/web/dist/spark/tokens.json");

// Hard-coding which tokens to show in the doc site
// just so that the line up (appear in the same order) and are grouped nicely
const colors = [
  "main-main",
  "support-support",
  "feedback-success",
  "feedback-alert",
  "feedback-error",
  "feedback-info",
  "feedback-neutral",
];

module.exports = {
  brand: colors.map((s) => `color-brand-${s}`),
};
