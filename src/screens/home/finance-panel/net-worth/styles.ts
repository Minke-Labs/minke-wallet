import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	tabsNetWorth: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 16,
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		marginTop: -1
	},
	netWorthItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 32
	},
	netWorthIcon: {
		padding: 16,
		borderRadius: 16,
		backgroundColor: '#F5F6F9'
	},
	netWorthIconAlert: {
		padding: 16,
		borderRadius: 16,
		backgroundColor: '#F6E7E5'
	},
	netWorthItemText: {
		flex: 1,
		marginLeft: 16
	},
	currentValueCard: {
		paddingTop: 16,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 16,
		backgroundColor: '#F5F6F9',
		borderRadius: 24,
		marginBottom: 40,
		marginTop: 16
	},
	cardLabel: {
		color: 'rgba(78, 94, 111, 1)',
		fontSize: 14,
		marginBottom: 8
	},
	cardBalance: {
		color: 'rgba(10, 32, 54, 1)',
		fontSize: 36
	},
	fontSizeDefault: {
		fontSize: 16
	},
	fontSizeSmall: {
		color: 'rgba(78, 94, 111, 1)',
		fontSize: 12
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	fontBold: {
		fontFamily: 'Inter_800ExtraBold'
	},
	arrowPadding: {
		paddingLeft: 4,
		marginTop: 2
	}
});
