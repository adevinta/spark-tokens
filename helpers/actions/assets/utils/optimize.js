const svgo = require("svgo");

const optimize = (svgString, { attributes = [], title } = {}) => {
  return svgo.optimize(svgString, {
    multipass: true, // boolean. false by default
    js2svg: {
      indent: 2, // string with spaces or number of spaces. 4 by default
      pretty: true, // boolean, false by default
    },
    plugins: [
      {
        name: "removeAttrs",
        params: {
          attrs: "(fill|stroke|stroke-width)",
        },
      },
      {
        name: "addAttributesToSVGElement",
        params: {
          attributes: [title && { "data-title": title }, ...attributes].filter(
            Boolean
          ),
        },
      },
      "removeDimensions",
      "mergePaths",
    ],
  }).data;
};

module.exports = optimize;
