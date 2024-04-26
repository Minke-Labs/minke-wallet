import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	fullScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: '#000'
	}
});
