import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	transactionDayRow: {
		paddingTop: 24,
		paddingBottom: 24,
		borderBottomWidth: 1,
		borderBottomColor: '#F2EAE1',
		marginBottom: 24
	},
	transactionItem: {
		marginBottom: 32,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	transactionDateLabel: {
		color: 'rgba(78, 94, 111, 1)',
		fontFamily: 'Inter_800ExtraBold'
	},
	transationalIcon: {
		width: 32,
		height: 32,
		marginRight: 8
	},
	tabsTransactions: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 16,
		backgroundColor: '#fff',
		borderTopRightRadius: 24,
		marginTop: -1
	},
	fontSizeSmall: {
		color: 'rgba(78, 94, 111, 1)',
		fontSize: 12
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	fontSizeDefault: {
		fontSize: 16
	},
	alignContentRight: {
		alignItems: 'flex-end'
	},
	fontBold: {
		fontFamily: 'Inter_800ExtraBold'
	}
});
