# minke-wallet
Minke iOS Wallet


How to lauch app localy:

- clone project from github
- run `npm install -g expo-cli`
- run `npm install`
- make sure postinstall.sh is executable run: `chmod +x ./scripts/postinstall.sh` from project root directory
- run postinstall script `./scripts/postinstall.sh`
- run `expo start`
- install Expo Go on your iPhone
- scan qr code from terminal where expo start command was lauched (the same QR code is opened in webpage)
- as an alternative you can run app on iOs simulator: https://docs.expo.dev/workflow/ios-simulator/
- in project root create .env file with following keys `INFURA_API_KEY=` and `INFURA_PROJECT_SECRET=`
