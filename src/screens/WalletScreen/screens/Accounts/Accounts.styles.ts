import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	tabsNetWorth: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 80,
		borderTopLeftRadius: 24,
		marginTop: 0,
		height: '100%'
	},
	currentValueCard: {
		paddingTop: 16,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 16,
		borderRadius: 24,
		marginBottom: 40,
		marginTop: 16,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		display: 'none'
	},
	cardLabel: {
		fontSize: 14,
		marginBottom: 8
	},
	cardBalance: {
		fontSize: 36
	}
});
