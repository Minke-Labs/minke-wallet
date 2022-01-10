import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		row: {
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		tabActive: {
			flex: 1,
			padding: 16,
			alignItems: 'center',
			borderTopLeftRadius: 16,
			borderTopRightRadius: 16,
			backgroundColor: colors.fill,
			fontFamily: 'Inter_800ExtraBold'
		},
		tabInactive: {
			flex: 1,
			padding: 16,
			alignItems: 'center',
			borderTopLeftRadius: 16,
			borderTopRightRadius: 16
		},
		tabTitleActive: {
			fontSize: 16,
			fontFamily: 'Inter_800ExtraBold'
		},
		tabTitleInactive: {
			fontSize: 16,
			color: colors.placeholder
		},
		roundInside: {
			position: 'relative',
			marginTop: 22
		}
	});
