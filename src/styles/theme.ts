import { DefaultTheme } from 'react-native-paper';

declare global {
	namespace ReactNativePaper {
		interface ThemeColors {
			buttonText: string;
			buttonDisabled: string;
			buttonColor: string;
			linkText: string;
			secondaryText: string;
			fill: string;
		}
	}
}

const darkTheme = {
	...DefaultTheme,
	roundness: 2,
	dark: true,
	colors: {
		...DefaultTheme.colors,
		background: '#0A2138',
		text: '#FFFFFF',
		placeholder: '#B7B9BB',
		primary: '#FFFFFF',
		buttonText: '#FFFFFF',
		buttonColor: '#006AA6',
		buttonDisabled: 'rgba(255, 255, 255, 0.5)',
		linkText: '#FFFFFF',
		surface: '#0A2138',
		secondaryText: '#748190',
		fill: 'rgba(255, 255, 255, 0.1)'
	}
};

const lightTheme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		background: '#F2EAE1',
		text: '#05222D',
		placeholder: '#213952',
		primary: '#006AA6',
		buttonText: '#FFFFFF',
		buttonColor: '#006AA6',
		buttonDisabled: '#D0D0D0',
		linkText: '#006AA6',
		secondaryText: '#4E5E6F',
		fill: '#FFFCF5'
	}
};

export { darkTheme, lightTheme };
