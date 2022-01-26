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
		secondaryText: {
			fontSize: 12,
			color: colors.secondaryText
		},
		alignContentRight: {
			alignItems: 'flex-end'
		}
	});
