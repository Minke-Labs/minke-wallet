import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		modalCoinDetails: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 16
		},
		modalCoinDetailsCoinName: {
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold',
			marginLeft: 16
		},
		currencyInput: {
			borderBottomColor: '#000000',
			borderBottomWidth: 1,
			paddingBottom: 8,
			fontSize: 32,
			marginTop: 16,
			marginBottom: 24
		},
		modalAmountContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 24
		},
		modalAmountSelectButton: {
			backgroundColor: colors.fill,
			alignItems: 'center',
			padding: 16,
			paddingRight: 24,
			paddingLeft: 24,
			borderRadius: 16
		},
		activeAmountButton: {
			backgroundColor: colors.linkText
		},
		modalAmountSelectButtonText: {
			fontSize: 24,
			color: colors.text
		},
		activeAmountButtonText: {
			fontSize: 24,
			color: colors.background
		},
		addDepositContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: 32,
			marginBottom: 32
		},
		addDeposit: {
			width: 'auto',
			padding: 8,
			borderRadius: 50,
			marginRight: 16,
			backgroundColor: colors.fill
		},
		addDepositText: {
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold'
		},
		addDepositInfo: {
			fontSize: 16,
			marginBottom: 16
		}
	});
