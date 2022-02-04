import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		contaier: {},
		textBold: {
			fontFamily: 'Inter_800ExtraBold'
		},
		alignRight: {
			alignItems: 'flex-end'
		},
		exchangeSection: {
			paddingLeft: 24,
			paddingRight: 24
		},
		exchangeHeadlineRow: {
			alignItems: 'center'
		},
		exchangeSummaryText: {
			marginTop: 8,
			fontSize: 12,
			color: colors.secondaryText
		},

		// Token card
		tokenCardWrap: {
			padding: 16,
			width: '100%'
		},
		tokenCard: {
			borderRadius: 16,
			marginTop: 16
		},
		tokenCardCoinContent: {
			flexWrap: 'wrap',
			flexDirection: 'row',
			width: '100%'
		},
		tokenCardCoin: {
			flexWrap: 'wrap',
			flexDirection: 'row',
			alignItems: 'center'
		},
		tokenImageContainer: {
			borderRadius: 50,
			borderWidth: 2,
			borderColor: 'rgba(98, 126, 234, 0.2)'
		},
		tokenImage: {
			borderRadius: 100,
			width: 40,
			height: 40
		},
		tokenName: {
			fontFamily: 'Inter_800ExtraBold',
			paddingLeft: 8
		},
		tokenCardDivisor: {
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: colors.background,
			marginTop: 24,
			marginBottom: 24
		},
		tokenCardDivisorBackground: {
			borderRadius: 50,
			padding: 8,
			backgroundColor: colors.background,
			position: 'absolute'
		},
		tokenCardDivisorImage: {
			width: 24,
			height: 24
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		tokenCardMaxButton: {
			flexDirection: 'row'
		},
		tokenCardMaxButtonContent: {
			alignItems: 'flex-end',
			marginTop: 8
		},
		tokenCardMaxButtonText: {
			color: colors.primary,
			paddingLeft: 4
		},
		selectTokenRow: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingRight: 16
		},
		currencyIcon: {
			padding: 8,
			marginRight: 8
		},

		// Gas Option
		scrollviewHorizontal: {
			marginTop: 24,
			marginBottom: 24,
			paddingLeft: 0
		},
		scrollviewHorizontalContent: {
			flexDirection: 'row',
			paddingLeft: 24,
			paddingRight: 32
		},
		gasSelectorCard: {
			borderRadius: 16,
			marginRight: 16,
			backgroundColor: colors.fill
		},
		selectedCard: {
			borderWidth: 2,
			borderColor: colors.primary
		},
		gasSelectorCardContent: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingLeft: 8
		},
		gasSelectorCardIcon: {
			padding: 8,
			borderRadius: 50,
			marginRight: 16,
			backgroundColor: '#F3F7FF'
		},
		gasSelectorCardGasOption: {
			marginRight: 16
		}
	});
