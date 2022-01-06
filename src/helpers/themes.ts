import { DefaultTheme } from 'react-native-paper';

declare global {
	namespace ReactNativePaper {
		interface ThemeColors {
			buttonText: string;
			linkText: string;
			secondaryText: string;
		}
	}
}

export const darkTheme = {
	...DefaultTheme,
	roundness: 2,
	dark: true,
	colors: {
		...DefaultTheme.colors,
		background: '#0A2036',
		text: '#FFFFFF',
		placeholder: '#B7B9BB',
		primary: '#FFFFFF',
		buttonText: '#FFFFFF',
		linkText: '#FFFFFF',
		surface: '#0A2036',
		secondaryText: '#748190'
	}
};

export const lightTheme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		background: '#F2EAE1',
		text: '#05222D',
		placeholder: '#213952',
		primary: '#006AA6',
		buttonText: '#FFFFFF',
		linkText: '#006AA6',
		secondaryText: '#4E5E6F'
	}
};
