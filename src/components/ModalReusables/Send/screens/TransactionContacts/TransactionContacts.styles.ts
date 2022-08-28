import { StyleSheet } from 'react-native';
import { deviceHeight } from '@styles';

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	contactsList: {
		maxHeight: deviceHeight * 0.4
	}
});
