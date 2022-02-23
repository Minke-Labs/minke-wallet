import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		height: 48,
		width: '100%',
		borderRadius: 64,
		justifyContent: 'center',
		alignItems: 'center',
		maxHeight: Dimensions.get('screen').height * 0.8,
		flexDirection: 'row',
		width: '100%'
	},
	smallContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		maxHeight: Dimensions.get('screen').height * 0.5
	}
});
