import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: '#000000'
	},
	opacity: {
		backgroundColor: '#00000060', // 0.6 of opacity
		flex: 1
	},
	masked: {
		backgroundColor: 'white',
		position: 'absolute'
	}
});
