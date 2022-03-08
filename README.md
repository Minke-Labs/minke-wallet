# minke-wallet

[Minke Ethereum and Polygon Wallet](https://www.minke.app/)

Minke iOS Wallet

How to lauch app localy:

-   clone project from github
-   run `npm install -g expo-cli`
-   or make sure you have the latest version of the cli (`npm install -g expo-cli --force`)
-   in project root create .env file with following keys `INFURA_API_KEY=` and `INFURA_PROJECT_SECRET=`
-   run `yarn`
-   make sure postinstall.sh is executable run: `chmod +x ./scripts/postinstall.sh` from project root directory
-   run postinstall script `./scripts/postinstall.sh`
-   npx install-expo-modules
-   run `expo run:ios`

To code and test features not supported by Expo Go / Simulator (Apple Pay):

In the local machine:

-   react-native run-ios --device "Marcos iPhone"

To build a test version out of it:

-   eas build --profile development --platform ios
