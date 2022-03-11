# minke-wallet

[Minke Ethereum and Polygon Wallet](https://www.minke.app/)

Minke iOS Wallet
@@ -8,11 +9,27 @@ How to lauch app localy:

-   clone project from github
-   run `npm install -g expo-cli`
-   or make sure you have the latest version of the cli (`npm install -g expo-cli --force`)
-   `cp .env.sample .env` and change the sample keys
-   run `yarn`
-   make sure postinstall.sh is executable run: `chmod +x ./scripts/postinstall.sh` from project root directory
-   run postinstall script `./scripts/postinstall.sh`
-   `npx pod-install`
-   [Create and install your first development build](https://docs.expo.dev/development/getting-started/#creating-and-installing-your-first-development-build)

Wow that you have a development build of your project installed on your device, you won't have to wait for the native build process again until you change the underlying native code that powers your app!

-   Instead, all you need to do to start developing is to run: `yarn start`.

To code and test features not supported by Expo Go / Simulator (Apple Pay):

In the local machine simulator:

-   expo run:ios

In a real device connected through USB

-   expo run:ios -d "Marcos iPhone"

To build a test version out of it:

-   eas build --profile development --platform ios
