import Constants from 'expo-constants';
import { Dimensions, Platform } from 'react-native';

const { statusBarHeight } = Constants;

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const { height: deviceHeight, width: deviceWidth } = Dimensions.get('screen');

const navigationBarHeight = Platform.OS === 'android' ? deviceHeight - screenHeight - statusBarHeight! : 0;
const os = Platform.OS;

const statusBar = os === 'android' ? statusBarHeight : 0;

export {
	os, screenHeight, screenWidth, deviceHeight, deviceWidth, statusBar, statusBarHeight, navigationBarHeight
};
