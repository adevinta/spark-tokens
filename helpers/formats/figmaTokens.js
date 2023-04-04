const { transform } = require("@divriots/style-dictionary-to-figma");

module.exports = function ({ dictionary }) {
  console.log(dictionary.tokens);
  const transformedTokens = transform(dictionary.tokens);
  console.log(transformedTokens);
  return JSON.stringify(transformedTokens, null, 2);
};
