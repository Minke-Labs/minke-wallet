import { StyleSheet } from 'react-native';

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
