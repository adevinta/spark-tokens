const modes = [`light`, `dark`, `hc`, `hcDark`];

module.exports = {
  source: [`tokens/**/!(*.${modes.join(`|*.`)}).json5`],
  action: {
    generateColorsets: require("./actions/ios/colorsets"),
  },
  platforms: {
    js: {
      transformGroup: "js",
      buildPath: "build/js/",
      files: [
        {
          destination: "_variables.js",
          format: "javascript/module",
        },
        {
          destination: "_variables.d.ts",
          format: "typescript/module-declarations",
        },
      ],
    },
    compose: {
      transformGroup: "compose",
      buildPath: "build/compose/",
      files: [
        {
          destination: "StyleDictionaryColor.kt",
          format: "compose/object",
          className: "StyleDictionaryColor",
          packageName: "StyleDictionaryColor",
          filter: {
            attributes: {
              category: "color",
            },
          },
        },
        {
          destination: "StyleDictionarySize.kt",
          format: "compose/object",
          className: "StyleDictionarySize",
          packageName: "StyleDictionarySize",
          type: "float",
          filter: {
            attributes: {
              category: "size",
            },
          },
        },
      ],
    },
    "ios-swift": {
      transformGroup: "ios-swift",
      buildPath: "build/ios-swift/",
      files: [
        {
          destination: "StyleDictionary+Class.swift",
          format: "ios-swift/class.swift",
          className: "StyleDictionaryClass",
          filter: {},
        },
        {
          destination: "StyleDictionary+Enum.swift",
          format: "ios-swift/enum.swift",
          className: "StyleDictionaryEnum",
          filter: {},
        },
        {
          destination: "StyleDictionary+Struct.swift",
          format: "ios-swift/any.swift",
          className: "StyleDictionaryStruct",
          filter: {},
          options: {
            imports: "SwiftUI",
            objectType: "struct",
            accessControl: "internal",
          },
        },
      ],
    },
    "ios-swift-separate-enums": {
      transformGroup: "ios-swift-separate",
      buildPath: "build/ios-swift/",
      files: [
        {
          destination: "StyleDictionaryColor.swift",
          format: "ios-swift/enum.swift",
          className: "StyleDictionaryColor",
          filter: {
            attributes: {
              category: "color",
            },
          },
        },
        {
          destination: "StyleDictionarySize.swift",
          format: "ios-swift/enum.swift",
          className: "StyleDictionarySize",
          filter: {
            attributes: {
              category: "size",
            },
          },
        },
      ],
    },
    "ios-colorsets": {
      buildPath: "build/ios-colorsets/",
      transforms: ["attribute/cti", "name/cti/pascal", "attribute/color"],
      actions: [`generateColorsets`],
    },
  },
};
