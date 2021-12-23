import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	headerImage: {
		resizeMode: 'cover',
		width: 250,
		marginLeft: -56,
		marginBottom: 32,
		zIndex: 10
	},
	backgroundTop: {
		position: 'absolute',
		top: 16,
		right: -8,
		zIndex: 0
	},
	backgroundBottom: {
		position: 'absolute',
		bottom: 0,
		right: -8,
		zIndex: -1
	},
	content: {
		padding: 48,
		position: 'relative'
	},
	textBold: {
		fontFamily: 'Inter_800ExtraBold'
	}
});
