import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	assetsContainer: {
		width: '100%',
		height: 161,
		borderRadius: 24,
		overflow: 'hidden',
		marginBottom: 16
	},
	assetsMain: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 17
	},
	buttonsContainer: {
		flexDirection: 'row',
		height: 53,
		borderTopWidth: 1
	},
	addFundsButtonContainer: {
		width: '50%',
		borderRightWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	sendButtonContainer: {
		width: '50%',
		borderLeftWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderWidth: 3
	}
});
