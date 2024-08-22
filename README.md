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

- For the web demo: Modify the paths in [build/web/demo/.eleventy.js](build/web/demo/.eleventy.js) and [build/web/demo/\_data/color.js](/build/web/demo/_data/color.js)
- For the iOS demo: Adjust the paths for `spec.source_files`, `spec.public_header_files` and `spec.resources` in [SparkTokens.podspec](SparkTokens.podspec)
- For the Android demo, refactor the `sparktokens` module in Android Studio unless you are familiar with Gradle

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

## Adding or updaring Icons

The global Process (from considering adding or updating an icon, to send it to production), is described [here in the DesignOPS playbook](https://playbook.mpi-internal.com/2c2e9ba82/p/258b11-icons).

### 1. Optimize the assets

First, make sure the added `svg` files are optimized and respect the standards:
- `24px by 24px` Viewbox
- Single `path` used in the svg (optimized file size using [svgo](https://github.com/svg/svgo))

### 2. Open a pull request

Then, add your svg files to `assets/spark/icons/` and open a pull request.

Pay attention to the Github actions triggered and make sure there are no errors in the `build` step.

### 2. Merge and deploy.

After reviewing and merging, two Github actions are triggered.

#### 2.1 Web action

The build process parses each icon and applies the following rules:

- **Multiplass** applies all the rules on any nested tag

- **Prettifies** the string output by adding 2 spaces on every nesting level

- **Removes** all attributes called “fill, stroke, stroke-with, xmlns”

- Adds data title to each icon

- **Adds fill**: “currentColor” and stroke: “none” to each `<svg>` opening parent tag

- **Removes Dimensions**: Removes the width and height attribute from the top-most `<svg>` element if specified, and replaces it with the viewBox attribute if missing.

- **Merge paths**: merge adjacent paths with the same attributes into one after checking for their possible intersection.

The resulting icons are placed into the “`build/web/dist/spark/icons`” directory.

Finally, all those files are pushed to a branch into another repository called [Polaris-web-icons](https://github.com/adevinta/polaris-web-icons). ([Read Spread its changes to all other platforms](https://zeroheight.com/2c2e9ba82/p/898a87-icons/t/335afd)).

#### 2.2 Android action

Apply SVGO and then convert them to Android Vector Drawables.

Push changes to the repo [Adevinta/spark-android](https://github.com/adevinta/spark-android/) in the branch "chore-updated-icons" with the same commit message.

### UNDERSTANDING THE ICON SYNC PROCESS

- **Spark Tokens**: This repo acts as the central repository and definitive source for all icons. Any updates to the icon collection originate here. When an update occurs on the `main` branch, the entire icon set is seamlessly distributed to both the Spark (web) and Spark Android repositories using [GitHub Actions](.github/workflows/).
- [**Polaris web icons (web)**](https://github.com/adevinta/polaris-web-icons): Receives the icon set from Spark Tokens and converts them into React components, making them readily usable within web-based applications. A pull request is opened for developers to review, thanks to a [GitHub Action](https://github.com/adevinta/polaris-web-icons/blob/main/.github/workflows/pr-icon-update.yml).
- [**Spark Android**](https://github.com/adevinta/spark-android): Receives Android Vector Drawables (AVDs) from Spark Tokens, ensuring compatibility and efficient integration into Android applications. A pull request is opened, thanks to a [GitHub Action](https://github.com/adevinta/spark-android/blob/main/.github/workflows/pr-icon-updates.yml).
- [**Spark iOS**](https://github.com/adevinta/spark-ios): While not directly synced, Spark iOS relies on Spark Tokens as the primary source for icons. Manual integration is performed as needed to incorporate the latest icons in the iOS app.

## LICENSE

[MIT](LICENSE)
