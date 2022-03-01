import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	header: {
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 32
	},
	button: {
		height: 48,
		borderRadius: 64,
		justifyContent: 'center',
		alignItems: 'center',
		maxHeight: height * 0.8,
		flexDirection: 'row',
		width: '100%'
	}
});
