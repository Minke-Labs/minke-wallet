import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: '#FFF'
	},
	background: {
		flex: 1
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
		backgroundColor: '#fff'
	},
	saveCurrentValue: {
		fontSize: 48,
		marginTop: 8,
		marginBottom: 24
	},
	depositCardContainer: {
		backgroundColor: '#F2EAE1',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 32,
		paddingRight: 24,
		paddingBottom: 32,
		paddingLeft: 24
	},
	depositCard: {
		borderRadius: 16,
		backgroundColor: '#FFF',
		padding: 24,
		marginBottom: 16
	},
	actionDepositCard: {
		borderRadius: 16,
		backgroundColor: '#FFF',
		padding: 24,
		alignItems: 'center',
		justifyContent: 'center'
	},
	actionDepositCardInfo: {
		paddingTop: 40,
		paddingBottom: 40
	},
	cardInfo: {
		color: '#748190',
		fontSize: 16,
		marginBottom: 16
	},
	cardCta: {
		color: '#4E5E6F',
		fontSize: 16
	}
});
