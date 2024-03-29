const StyleDictionary = require("style-dictionary");
const fs = require("fs-extra");

// read brand folder
const brand = process.argv[2] || "spark";

const iosPath = `build/ios/dist/${brand}/`;
const androidRoot = `build/android/${brand}tokens/src/main`;
const androidPath = `${androidRoot}/res/`;
const composePath = `${androidRoot}/kotlin/`;
const webPath = `build/web/dist/${brand}/`;

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
[iosPath, androidPath, composePath, webPath].forEach((dir) => {
  console.log(`🧹 cleaning ${dir}...`);
  fs.removeSync(dir);
});

// Adding custom actions, transforms, and formats
const styleDictionary = StyleDictionary.extend({
  // custom actions
  action: {
    generateColorsets: require("./helpers/actions/ios/colorsets"),
    generateGraphics: require("./helpers/actions/assets/graphics"),
    generateIcons: require("./helpers/actions/assets/icons"),
  },
  // custom transforms
  transform: {
    "attribute/cti": require("./helpers/transforms/attributeCTI"),
    colorRGB: require("./helpers/transforms/colorRGB"),
    "size/remToFloat": require("./helpers/transforms/remToFloat"),
  },
  // custom formats
  format: {
    composeColorPalette: require("./helpers/formats/composeColorPalette"),
    swiftColor: require("./helpers/formats/swiftColor"),
    swiftImage: require("./helpers/formats/swiftImage"),
  },
});

const modes = [`light`, `dark`, `hc`, `hcDark`];

const assets = {
  transforms: [`attribute/cti`, `color/hex`, `size/remToFloat`],
  buildPath: `${webPath}images/`,
  iconPath: `${webPath}icons/`,
  iosPath,
  androidPath,
  actions: [`generateGraphics`],
};

const iosColors = {
  buildPath: iosPath,
  transforms: [`attribute/cti`, `colorRGB`, `name/ti/camel`],
  actions: [`generateColorsets`],
};

console.log(`☀️ Building light mode...`);
styleDictionary
  .extend({
    source: [
      // this is saying find any files in the tokens folder
      // that does not have .dark or .light, but ends in .json5
      `tokens/${brand}/**/!(*.${modes.join(`|*.`)}).json5`,
    ],

    platforms: {
      css: {
        transformGroup: `css`,
        buildPath: webPath,
        files: [
          {
            destination: `variables.css`,
            format: `css/variables`,
            options: {
              outputReferences: true,
            },
          },
        ],
      },

      js: {
        transformGroup: `web`,
        buildPath: webPath,
        files: [
          {
            destination: `tokens.json`,
            format: `json/flat`,
          },
        ],
      },

      assets: Object.assign(
        { ...assets, actions: [...assets.actions, `generateIcons`] },
        {
          // mode lets the custom actions know which color mode they are being run on
          mode: `light`,
        }
      ),

      iosColors: Object.assign(iosColors, {
        mode: `light`,
      }),

      iOS: {
        buildPath: iosPath,
        transforms: [
          `attribute/cti`,
          `name/ti/camel`,
          `size/swift/remToCGFloat`,
        ],
        files: [
          {
            destination: `Color.swift`,
            format: `swiftColor`,
            filter: (token) => token.attributes.category === `color`,
            options: {
              outputReferences: true,
            },
          },
          {
            destination: `Size.swift`,
            filter: (token) => token.attributes.category === `size`,
            className: `Size`,
            format: `ios-swift/class.swift`,
          },
          {
            destination: `Image.swift`,
            filter: (token) => token.attributes.category === `image`,
            format: `swiftImage`,
          },
        ],
      },

      android: {
        transformGroup: `android`,
        buildPath: androidPath,
        files: [
          {
            destination: `values/colors.xml`,
            format: `android/resources`,
            filter: (token) => token.attributes.category === `color`,
            options: {
              // this is important!
              // this will keep token references intact so that we don't need
              // to generate *all* color resources for dark mode, only
              // the specific ones that change
              outputReferences: true,
            },
          },
          {
            destination: `values/font_dimens.xml`,
            filter: (token) =>
              token.attributes.category === `size` &&
              token.attributes.type === `font`,
            format: `android/resources`,
          },
          {
            destination: `values/dimens.xml`,
            filter: (token) =>
              token.attributes.category === `size` &&
              token.attributes.type !== `font`,
            format: `android/resources`,
          },
        ],
      },

      compose: {
        transformGroup: "compose",
        buildPath: composePath,
        files: [
          {
            destination: "PaletteTokens.kt",
            format: `composeColorPalette`,
            className: "PaletteTokens",
            packageName: `com.adevinta.${brand}.tokens`,
            filter: (token) =>
              token.attributes.category === `color` &&
              token.attributes.type === `core`,
          },
        ],
      },
    },
  })
  .buildAllPlatforms();

// Dark Mode
// we will only build the files we need to, we don't need to rebuild all the files
console.log(`\n\n🌙 Building dark mode...`);
styleDictionary
  .extend({
    // Using the include array so that theme token overrides don't show
    // warnings in the console.
    include: [`tokens/${brand}/**/!(*.${modes.join(`|*.`)}).json5`],
    source: [`tokens/${brand}/**/*.dark.json5`],
    platforms: {
      css: {
        transformGroup: `css`,
        buildPath: webPath,
        files: [
          {
            destination: `variables-dark.css`,
            format: `css/variables`,
            // only putting in the tokens from files with '.dark' in the filepath
            filter: (token) => token.filePath.indexOf(`.dark`) > -1,
            options: {
              outputReferences: true,
            },
          },
        ],
      },

      assets: Object.assign(assets, {
        mode: `dark`,
      }),

      iosColors: Object.assign(iosColors, {
        mode: `dark`,
      }),

      android: {
        transformGroup: `android`,
        buildPath: androidPath,
        files: [
          {
            destination: `values-night/colors.xml`,
            format: `android/resources`,
            // only outputting the tokens from files with '.dark' in the filepath
            filter: (token) => token.filePath.indexOf(`.dark`) > -1,
          },
        ],
      },
    },
  })
  .buildAllPlatforms();

// // High-Contrast Dark Mode
// // we will only build the files we need to, we don't need to rebuild all the files
console.log(`\n\n🌈🌙 Building high-contrast dark mode...`);
styleDictionary
  .extend({
    include: [`tokens/${brand}/**/!(*.${modes.join(`|*.`)}).json5`],
    source: [`tokens/${brand}/**/*.hcDark.json5`],

    platforms: {
      css: {
        transformGroup: `css`,
        buildPath: webPath,
        files: [
          {
            destination: `variables-hc-dark.css`,
            format: `css/variables`,
            filter: (token) => token.filePath.indexOf(`.hcDark`) > -1,
            options: {
              outputReferences: true,
            },
          },
        ],
      },

      // Because iOS only has good support for high-contrast modes
      // we will only build the necessary files for iOS:
      assets: Object.assign(assets, {
        mode: `hcDark`,
      }),

      iosColors: Object.assign(iosColors, {
        mode: `hcDark`,
      }),
    },
  })
  .buildAllPlatforms();

// // High-Contrast Light Mode
// // we will only build the files we need to, we don't need to rebuild all the files
console.log(`\n\n🌈☀️ Building high-contrast light mode...`);
styleDictionary
  .extend({
    include: [`tokens/${brand}/**/!(*.${modes.join(`|*.`)}).json5`],
    source: [`tokens/${brand}/**/*.hc.json5`],

    platforms: {
      css: {
        transformGroup: `css`,
        buildPath: webPath,
        files: [
          {
            destination: `variables-hc.css`,
            format: `css/variables`,
            filter: (token) => token.filePath.indexOf(`.hc`) > -1,
            options: {
              outputReferences: true,
            },
          },
        ],
      },

      assets: Object.assign(assets, {
        mode: `hc`,
      }),

      iosColors: Object.assign(iosColors, {
        mode: `hc`,
      }),
    },
  })
  .buildAllPlatforms();
