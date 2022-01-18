import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		transactionDayRow: {
			paddingTop: 24,
			paddingBottom: 24,
			borderBottomWidth: 1,
			borderBottomColor: colors.background,
			marginBottom: 24
		},
		transactionDateLabel: {
			color: colors.secondaryText,
			fontFamily: 'Inter_800ExtraBold'
		},
		tabsTransactions: {
			paddingTop: 24,
			paddingLeft: 24,
			paddingRight: 24,
			paddingBottom: 80,
			backgroundColor: colors.fill,
			borderTopRightRadius: 24,
			marginTop: 0,
			height: '100%'
		},
		row: {
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		fontSizeSmall: {
			color: colors.secondaryText,
			fontSize: 12
		}
	});
