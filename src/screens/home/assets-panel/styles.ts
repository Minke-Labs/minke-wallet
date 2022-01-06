import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	paddingContent: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 16
	},
	card: {
		borderRadius: 24,
		overflow: 'hidden',
		marginBottom: 16,
		borderColor: '#FFFFFF',
		borderStyle: 'solid',
		borderWidth: 0.1
	},
	cardTopContent: {
		padding: 24,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	cardLabel: {
		fontSize: 14,
		marginBottom: 8
	},
	cardBalance: {
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
		borderTopWidth: 1,
		paddingLeft: 24,
		paddingRight: 24,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	cardDivisor: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		borderRightWidth: 1
	}
});
