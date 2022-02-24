import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	// ... BACKGROUND ...
	backgroundContainer: {
		flex: 1
	},
	backgroundTop: {
		position: 'absolute',
		right: 0
	},
	backgroundBottom: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		zIndex: 0
	},

	// ... WELCOME SCREEN ...
	container: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	headerImage: {
		resizeMode: 'contain',
		width: 304,
		height: 288,
		marginLeft: -24
	},
	textContainer: {
		width: '100%',
		alignItems: 'center'
	},
	buttonContainer: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 48,
		paddingHorizontal: 24
	}
});
