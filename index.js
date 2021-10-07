import 'react-native-gesture-handler';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import './shim.js'
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
