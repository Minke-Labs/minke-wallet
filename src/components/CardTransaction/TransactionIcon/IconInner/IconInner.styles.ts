import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	base: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: 'white',
		width: 14,
		height: 14,
		borderRadius: 7,
		alignItems: 'center',
		justifyContent: 'center'
	},
	pending: {
		position: 'absolute',
		backgroundColor: 'black',
		width: 6,
		height: 6
	}
});
