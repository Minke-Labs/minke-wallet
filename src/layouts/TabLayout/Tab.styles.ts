import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 24,
		borderTopLeftRadius: 24
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		position: 'absolute',
		bottom: 0
	},
	square: {
		width: 20,
		height: 20,
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#fff'
	},
	titleBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
