const fs = require("fs-extra");
const svgo = require("svgo");
const s2v = require("svg2vectordrawable");

/**
 * This function will generate an Android Vector Drawable
 * @param {Object} options
 * @param {String} options.svg - The content of the SVG that will be turned into a vector drawable. The SVG content at this point should have had all the token references inside of it resolved.
 * @param {String} options.name - The name of the image token
 * @param {String} options.androidPath - The build path for Android. This will be defined in the configuration
 */
function androidVector(androidPath, svg, name) {
  const outputPath = `${androidPath}${name}.xml`;

  fs.ensureFileSync(outputPath);

  // optimize icon
  const { data } = svgo.optimize(svg);

  // s2v will generate an Android vector drawable file
  // from SVG. We are reusing the output already generated above.
  s2v(data).then((xml) => {
    setTimeout(() => null, 0); // forces node to not exit immediately
    fs.writeFileSync(outputPath, xml);
    console.log(`✔︎  ${outputPath}`);
  });
}

module.exports = androidVector;
