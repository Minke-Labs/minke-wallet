import { joinSignature } from 'ethers/lib/utils';
import { ColorPropType, StyleSheet } from 'react-native';

export default StyleSheet.create({
	contaier: {},
	textBold: {
		fontFamily: 'Inter_800ExtraBold'
	},
	alignRight: {
		alignItems: 'flex-end'
	},
	exchangeSection: {
		padding: 24
	},
	pageTitle: {
		fontFamily: 'Inter_800ExtraBold'
	},

	// Token card
	tokenCard: {
		borderRadius: 16,
		padding: 16
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
		borderColor: '#F2EAE1',
		marginTop: 24,
		marginBottom: 24
	},
	tokenCardDivisorBackground: {
		borderRadius: 50,
		padding: 8,
		backgroundColor: '#F2EAE1',
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
		alignItems: 'center'
	},
	currencyIcon: {
		padding: 8,
		borderRadius: 50,
		marginRight: 16,
		backgroundColor: '#F3F7FF'
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
		marginRight: 16
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
	}
});
