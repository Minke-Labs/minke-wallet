import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		appBar: {
			backgroundColor: 'transparent',
			elevation: 0
		},
		appBarContent: {
			paddingLeft: 24,
			paddingRight: 24,
			flexDirection: 'row',
			alignItems: 'center'
		},
		appBarIcons: {
			flexDirection: 'row'
		},
		appBarIcon: {
			paddingLeft: 24,
			justifyContent: 'center'
		},
		appBarUserName: {
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold'
		},
		welcomeText: {
			color: colors.secondaryText
		}
	});
