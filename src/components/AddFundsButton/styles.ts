import { joinSignature } from 'ethers/lib/utils';
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
		modalContainerStyle: {
			backgroundColor: colors.background,
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			padding: 24,
			width: '100%',
			position: 'absolute',
			bottom: 0
		},
		safeAreaView: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		fontBold: {
			fontFamily: 'Inter_800ExtraBold'
		},
		modalHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 8
		},
		modalHeadline: {
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold'
		},
		modalSubHeadline: {
			marginBottom: 24,
			fontSize: 18,
			fontFamily: 'Inter_500Medium'
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
		hintBellowButton: {
			color: '#4F4F4F',
			textAlign: 'center',
			fontSize: 16,
			padding: 16,
			flexDirection: 'row',
			justifyContent: 'center',
			alignContent: 'center',
			alignItems: 'center'
		},
		hintBellowButtonText: {
			marginLeft: 8
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
