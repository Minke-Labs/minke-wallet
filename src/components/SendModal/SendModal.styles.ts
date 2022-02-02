import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		maxHeight: Dimensions.get('screen').height * 0.8
	},
	smallContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		maxHeight: Dimensions.get('screen').height * 0.5
	}
});
