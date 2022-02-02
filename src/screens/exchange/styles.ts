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
			flexDirection: 'column',
			paddingTop: 24,
			marginBottom: 24
		},
		pageTitle: {
			fontFamily: 'Inter_800ExtraBold'
		},
		exchangeSummaryText: {
			marginTop: 8
		},

		// Token card
		tokenCardWrap: {
			padding: 16
		},
		tokenCard: {
			borderRadius: 16,
			marginTop: 24,
			backgroundColor: colors.fill
		},
		tokenCardCoinContent: {
			flexWrap: 'wrap',
			flexDirection: 'row'
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
			alignItems: 'flex-end'
		},
		tokenCardMaxButtonContent: {
			flexDirection: 'row',
			alignItems: 'center',
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
			marginRight: 8,
			borderRadius: 500
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
		gasSelectorCardContent: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		gasSelectorCardIcon: {
			padding: 8,
			borderRadius: 50,
			marginRight: 16,
			backgroundColor: '#F3F7FF'
		},
		gasSelectorCardGasOption: {
			marginRight: 16
		},

		// SearchTokens
		header: {
			flexDirection: 'row',
			justifyContent: 'flex-end'
		},
		searchBar: {
			borderTopLeftRadius: 50,
			borderTopRightRadius: 50,
			borderRadius: 50,
			overflow: 'hidden',
			marginBottom: 24,
			height: 48,
			borderBottomWidth: 0,
			borderBottomColor: colors.fill,
			backgroundColor: colors.fill
		},
		tokenItem: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 24
		},
		tokenItemNameContainer: {
			flexDirection: 'column'
		},
		tokenItemImage: {
			width: 50,
			height: 50,
			borderRadius: 100,
			marginRight: 16
		},
		tokenItemSymbol: {
			color: colors.placeholder,
			fontSize: 12,
			marginBottom: 4
		},
		tokenItemName: {
			color: colors.text,
			fontFamily: 'Inter_800ExtraBold',
			fontSize: 16
		}
	});
