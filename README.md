# SPARK TOKENS

A tool for synchronizing Spark design tokens between Figma and our three platforms (web, Android, iOS).

## PROJECT SETUP

1. Clone the repository: `git clone https://github.com/adevinta/spark-tokens && cd spark-tokens`
2. Install dependencies: `npm ci`
3. Run Style Dictionary: `npm run build`

## PROJECT STRUCTURE

- [assets](assets): source SVG graphics.
- [build](build): demos and generated files from Style Dictionary.
- [helpers](helpers): custom actions, transform and format code to generate assets.
- [tokens](tokens): source token files, organized by brand folders.
- [build.js](build.js): code that runs Style Dictionary.

## WEB DEMO

1. Navigate to the [build/web/demo](build/web/demo) directory: `cd build/web/demo`
2. Install dependencies by running `npm install`. This will also create a local dependency on our `spark-tokens` package with a symlink using npm link
3. Start [11ty](https://www.11ty.dev/) with `npm start`
4. Open `http://localhost:8080` in your web browser

Note: If you make any changes, you will need to restart the 11ty server because it passes through the generated files from Style Dictionary

## iOS DEMO

1. Ensure you have Xcode 12 or a newer version installed
2. You will also need [CocoaPods](https://cocoapods.org/) installed
3. Navigate to the [build/ios/demo](build/ios/demo) directory: `cd build/ios/demo`
4. Install the SparkTokens CocoaPod with `pod install`
5. Open the Xcode workspace: `open SparkTokensDemo.xcworkspace`
6. Click the ▶️ button to build and run the demo

Note: If you add new files in the Style Dictionary configuration, you will need to run `pod install` in the `build/ios/demo` directory again so CocoaPods can link the newly generated files into Xcode.

## ANDROID DEMO

1. Launch Android Studio
2. Click on "Open an existing project"
3. Navigate to the folder where you cloned the repository and select the [build/android](build/android) folder
4. Android Studio will sync dependencies
5. Click the ▶️ button at the top to build and run the app in an emulator (ensure you have an emulator downloaded)

Note: After making changes to the design tokens, rebuild Style Dictionary with `npm run build` in the root directory. Alternatively, use `npm start` to watch for changes. After Style Dictionary builds, rebuild the Android application by clicking the ▶️ button in Android Studio.

## BRAND USAGE

You can specify the brand folder from which you want to generate tokens. In [package.json](package.json), change the `"brand"` property to your brand's folder:

```
"brand": "spark",
```

Then, edit the following configuration files to adapt the demos to your brand's tokens:

- for the web demo: modify the paths in [build/web/demo/.eleventy.js](build/web/demo/.eleventy.js) and [build/web/demo/\_data/color.js](/build/web/demo/_data/color.js)
- for the iOS demo: adjust the paths for `spec.source_files`, `spec.public_header_files` and `spec.resources` in [SparkTokens.podspec](SparkTokens.podspec)
- for the Android demo, refactor the `sparktokens` module in Android Studio unless you are familiar with Gradle

## UNDERSTANDING THE DESIGN TOKEN STRUCTURE

We follow a three-tier approach as described by Brad Frost in his [article](https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/). In this approach, there are three tiers:

- **Tier 1 tokens**: These define the theme's design properties in the abstract, serving as the raw materials for the UI's visual language. For colors, it's our core palette. Ex: `color-core-paleadevinta-50`
- **Tier 2 tokens**: They represent a semantic theme layer that maps Tier-1 tokens to high-level usage within a UI. For colors, it's our brand themes. Ex: `color-brand-main-main`
- **Tier 3 tokens**: These are specific to components and are mapped to Tier-2 tokens. For colors, it's all the brand colors used by a component. Ex: `component-badge-background-color`

This structure helps organize and manage design tokens effectively within the design system.

## EXPORTING DESIGN TOKENS

Design tokens are exported from Figma using the [Design Tokens](https://www.figma.com/community/plugin/888356646278934516/Design-Tokens) extension. To export design tokens, follow these steps:

1. Open Figma and navigate to your library file where your styles are defined. You will need a core palette and two themes using this palette, one light and one dark.
2. Click on the Resources menu icon, then on the Plugin tab, search for the [Design Tokens](https://www.figma.com/community/plugin/888356646278934516/Design-Tokens) Figma plugin.
3. Click on the down arrow next to the plugin name, select "Export Design Token file". Don't touch the File Export settings, select the design tokens you want to export. Here we are mostly interested in colors.
4. Click on Save & Export, name your JSON file figmaTokens.json.
5. Place the exported JSON file in your `color` folder within the tokens directory, under your brand's folder.

## LICENSE

[MIT](LICENSE)
