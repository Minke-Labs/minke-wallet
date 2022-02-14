import { joinSignature } from 'ethers/lib/utils';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'space-between',
			backgroundColor: colors.fill
		},
		background: {
			flex: 1
		},
		headerNavegation: {
			paddingTop: 56,
			paddingLeft: 24,
			paddingRight: 24,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		headerNavegationLeft: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		headerNavegationTitle: {
			marginLeft: 8
		},
		saveCurrentValueContainer: {
			flex: 1,
			flexDirection: 'column',
			padding: 24,
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center'
		},
		row: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		},
		depositButton: {
			paddingTop: 16,
			paddingRight: 32,
			paddingBottom: 16,
			paddingLeft: 32,
			backgroundColor: colors.fill
		},
		saveCurrentValue: {
			fontSize: 48,
			marginTop: 8,
			marginBottom: 24
		},
		depositCardContainer: {
			backgroundColor: colors.background,
			// backgroundColor: '#FFF',
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			paddingTop: 32,
			paddingRight: 24,
			paddingBottom: 32,
			paddingLeft: 24
		},
		depositCard: {
			borderRadius: 16,
			backgroundColor: colors.fill,
			marginBottom: 16,
			flexDirection: 'row',
			alignContent: 'center',
			justifyContent: 'center'
		},
		depositCardItem: {
			width: '50%',
			padding: 24
		},
		divisor: {
			borderRightWidth: 1,
			flexGrow: 1,
			flexBasis: 0,
			justifyContent: 'center',
			borderRightColor: colors.background
		},
		depositsAmount: {
			color: colors.text,
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold',
			marginTop: 8
		},
		depositsAmountLebel: {
			color: colors.secondaryText
		},
		actionDepositCard: {
			borderRadius: 16,
			backgroundColor: colors.fill,
			padding: 24,
			alignItems: 'center',
			justifyContent: 'center'
		},
		actionDepositCardInfo: {
			paddingTop: 40,
			paddingBottom: 40
		},
		cardInfo: {
			color: colors.secondaryText,
			fontSize: 16,
			marginBottom: 16
		},
		cardCta: {
			color: colors.secondaryText,
			fontSize: 16
		}
	});
