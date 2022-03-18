import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
	container: {
		height: 51,
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
		width: screenWidth
	}
});
