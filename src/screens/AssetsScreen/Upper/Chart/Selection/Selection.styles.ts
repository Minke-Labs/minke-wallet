import { StyleSheet } from 'react-native';
import { screenWidth } from '@styles';

export const styles = StyleSheet.create({
	container: {
		width: screenWidth,
		marginBottom: 34
	},

	backgroundTag: {
		backgroundColor: '#006AA6',
		...StyleSheet.absoluteFillObject,
		width: 52,
		height: '100%',
		borderRadius: 16
	},

	labelContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 32
	}
});
