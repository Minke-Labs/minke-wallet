import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	contactsList: {
		maxHeight: Dimensions.get('screen').height * 0.4
	}
});
