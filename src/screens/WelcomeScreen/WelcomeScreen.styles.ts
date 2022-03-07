import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	headerImage: {
		resizeMode: 'contain',
		width: 282,
		height: 270
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
