import { joinSignature } from 'ethers/lib/utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F2EAE1'
	},
	homeScroll: {
		marginBottom: 80
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	alignContentRight: {
		alignItems: 'flex-end'
	},
	fontSizeDefault: {
		fontSize: 16
	},
	fontSizeSmall: {
		color: 'rgba(78, 94, 111, 1)',
		fontSize: 12
	},
	fontBold: {
		fontFamily: 'Inter_800ExtraBold'
	},
	paddingContent: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 16
	},
	card: {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 24,
		overflow: 'hidden',
		marginBottom: 16
	},
	cardTopContent: {
		padding: 24,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
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
	avatar: {
		width: 48,
		height: 48,
		borderColor: 'rgba(243, 247, 255, 1)',
		borderRadius: 50,
		borderWidth: 4
	},
	cardBottomContent: {
		borderTopColor: 'rgba(242, 234, 225, 1)',
		borderTopWidth: 1,
		backgroundColor: '#ffffff',
		paddingLeft: 24,
		paddingRight: 24,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	cardActionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 16,
		paddingBottom: 16
	},
	cardButtonIcon: {
		paddingRight: 8
	},
	cardDivisor: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		borderRightColor: 'rgba(242, 234, 225, 1)',
		borderRightWidth: 1
	},
	scrollviewHorizontal: {
		paddingLeft: 24,
		marginBottom: 32,
		paddingBottom: 8
	},
	scrollviewHorizontalContent: {
		flexDirection: 'row'
	},
	cardScroll: {
		borderRadius: 16,
		paddingLeft: 16,
		paddingRight: 16,
		marginRight: 16
	},
	appBar: {
		backgroundColor: 'transparent',
		elevation: 0
	},
	appBarContent: {
		paddingLeft: 24,
		paddingRight: 24,
		flexDirection: 'row',
		alignItems: 'center'
	},
	appBarIcons: {
		flexDirection: 'row'
	},
	appBarIcon: {
		paddingLeft: 24,
		justifyContent: 'center'
	},
	appBarUserName: {
		fontSize: 24,
		color: '#0A2138',
		fontFamily: 'Inter_800ExtraBold'
	},
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
	tabs: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 16,
		backgroundColor: '#fff'
	},
	tabActive: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: '#fff'
	},
	tabInactive: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16
	}
});
