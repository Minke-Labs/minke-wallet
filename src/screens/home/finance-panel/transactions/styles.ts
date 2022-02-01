import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors, scheme?: string | null) =>
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
		secondaryText: {
			fontSize: 12,
			color: colors.secondaryText
		},
		alignContentRight: {
			alignItems: 'flex-end'
		},
		netWorthIcon: {
			padding: 16,
			borderRadius: 16,
			borderColor: 'rgba(255, 255, 255, 0.1)',
			borderStyle: 'solid',
			borderWidth: 1,
			marginTop: 16,
			marginBottom: 16,
			backgroundColor: scheme === 'dark' ? undefined : 'rgba(103, 152, 242, 0.1)'
		},
		transactionsText: {
			fontFamily: 'Inter_500Medium',
			fontSize: 16,
			color: colors.secondaryText,
			marginBottom: 16
		},
		startedText: {
			color: colors.text,
			fontSize: 16,
			fontFamily: 'Inter_700Bold',
			marginBottom: 16
		}
	});
