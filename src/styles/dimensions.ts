import { Dimensions, StatusBar, Platform } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const { height: deviceHeight, width: deviceWidth } = Dimensions.get('screen');
const statusBarHeight = StatusBar.currentHeight;
const navigationBarHeight = Platform.OS === 'android' ? deviceHeight - screenHeight - statusBarHeight! : 0;
const os = Platform.OS;

export {
	os, screenHeight, screenWidth, deviceHeight, deviceWidth, statusBarHeight, navigationBarHeight
};
