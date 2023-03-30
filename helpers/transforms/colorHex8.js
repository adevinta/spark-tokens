var Color = require("tinycolor2");

module.exports = {
  type: `value`,
  matcher: (token) => token.attributes.category === `color`,
  transformer: (prop) => {
    const hex8 = Color(prop.value).toHex8();
    return `Color(0x${hex8})`;
  },
};
