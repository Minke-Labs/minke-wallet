import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
	cardDivisor: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		borderRightColor: 'rgba(242, 234, 225, 1)',
		borderRightWidth: 1
	}
});
