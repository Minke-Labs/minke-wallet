import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
	// ...BACKGROUND
	aaveGhost: {
		width: 450,
		height: 499,
		position: 'absolute',
		bottom: -56,
		right: -56
	},
	// ...OPENAAVE
	container: {
		position: 'absolute',
		padding: 24,
		height: '100%',
		width: '100%',
		justifyContent: 'space-between'
	},
	headerNavigation: {
		flexDirection: 'row',
		marginBottom: 16
	},

	transparentCard: {
		backgroundColor: 'rgba(255, 255, 255, 0.12)'
	},

	backgroundContainer: {
		height: 277
	},
	background: {
		position: 'absolute',
		width: '100%'
	},
	linearGradient: {
		height: '100%'
	},

	actionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	loadingBox: {
		position: 'absolute',
		bottom: 24,
		width: screenWidth
	}
});
