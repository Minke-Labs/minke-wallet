import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		cardDivisor: {
			width: '50%',
			flexDirection: 'row',
			alignItems: 'center',
			borderRightWidth: 1,
			flexGrow: 1,
			flexBasis: 0,
			justifyContent: 'center',
			borderRightColor: colors.background
		},
		modalContainerStyle: { backgroundColor: 'white', padding: 20 }
	});
