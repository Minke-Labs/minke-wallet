import './shim';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import '@ethersproject/shims';

import { registerRootComponent } from 'expo';

import { Platform } from 'react-native';
import App from './App.tsx';

export default {
	android: Platform.OS === 'android',
	ios: Platform.OS === 'ios'
};
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
