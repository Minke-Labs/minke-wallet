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
		transactionItem: {
			marginBottom: 32,
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		transactionDateLabel: {
			color: colors.secondaryText,
			fontFamily: 'Inter_800ExtraBold'
		},
		transationalIcon: {
			width: 32,
			height: 32,
			marginRight: 8
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
		fontSizeSmall: {
			color: colors.secondaryText,
			fontSize: 12
		},
		row: {
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		fontSizeDefault: {
			fontSize: 16
		},
		alignContentRight: {
			alignItems: 'flex-end'
		},
		fontBold: {
			fontFamily: 'Inter_800ExtraBold'
		}
	});
