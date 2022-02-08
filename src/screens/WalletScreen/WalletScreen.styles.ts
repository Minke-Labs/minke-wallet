import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		paddingHorizontal: 24
	},
	iconsContainer: {
		flexDirection: 'row'
	},

	// ... HEADER ...
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 24
	},

	// ... ASSETS ...
	assetsContainer: {
		width: '100%',
		height: 161,
		borderRadius: 24,
		overflow: 'hidden'
	},
	assetsMain: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 17,
		backgroundColor: '#FFFCF5'
	},
	buttonsContainer: {
		flexDirection: 'row',
		height: 53
	},
	addFundsButtonContainer: {
		backgroundColor: '#fff',
		width: '50%',
		borderRightColor: '#F2EAE1',
		borderRightWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	sendButtonContainer: {
		backgroundColor: '#fff',
		width: '50%',
		borderLeftColor: '#F2EAE1',
		borderLeftWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
