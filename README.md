# SPARK TOKENS

A tool to synchronize Adevinta design tokens between Figma and our three platforms (web, android, iOS).

## PROJECT SETUP

1. Grab the repository code: `git clone https://github.com/adevinta/spark-tokens`
2. Install dependencies: `npm ci`
3. Run Style Dictionary: `npm run build`

## PROJECT STRUCTURE

- [assets](assets): source SVG graphics.
- [build](build): demos and generated files from Style Dictionary.
- [helpers](helpers): custom actions, transform and format code to generate assets.
- [tokens](tokens): source token files, with one folder by brand.
- [build.js](build.js): code that runs Style Dictionary.

## WEB DEMO

1. Go into the [build/web/demo](build/web/demo) directory with `cd build/web/demo`
2. Run `npm install` to install dependencies. This will also create a local dependency on our spark-tokens package with a symlink using npm link
3. Run npm start to start [11ty](https://www.11ty.dev/)
4. Open `http://localhost:8080` in your browser

# iOS DEMO

1. Make sure you have Xcode 12 or greater installed
2. You will need [CocoaPods](https://cocoapods.org/) installed
3. Go into into the [build/ios/demo](build/ios/demo) directory with `cd build/ios/demo`
4. Run `pod install` to install the SparkTokens CocoaPod
5. Open the Xcode workspace: `open SparkTokensDemo.xcworkspace`
6. Click the ▶️ button to build and run the demo

Note: if you add new files in the Style Dictionary configuration, you will need to run `pod install` in the `ios/demo` directory again so CocoaPods can link the newly generated files into Xcode

## LICENSE

[MIT](LICENSE)
