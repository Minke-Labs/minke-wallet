import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		width: '100%',
		height: 48,
		borderRadius: 64,
		justifyContent: 'center',
		alignItems: 'center',
		maxHeight: Dimensions.get('screen').height * 0.8,
		flexDirection: 'row'
	},
	smallContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		maxHeight: Dimensions.get('screen').height * 0.5
	}
});
