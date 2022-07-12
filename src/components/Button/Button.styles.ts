import { StyleSheet } from 'react-native';
import { deviceHeight } from '@styles';

export const styles = StyleSheet.create({
	button: {
		width: '100%',
		height: 48,
		borderRadius: 64,
		justifyContent: 'center',
		alignItems: 'center',
		maxHeight: deviceHeight * 0.8,
		flexDirection: 'row'
	},
	smallContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		maxHeight: deviceHeight * 0.5
	}
});
