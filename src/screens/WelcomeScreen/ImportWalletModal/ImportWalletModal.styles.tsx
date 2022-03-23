import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		minHeight: Dimensions.get('screen').height * 0.3
	},
	addWalletContainer: {
		alignItems: 'center',
		minHeight: Dimensions.get('screen').height * 0.4
	},

	textAreaContainer: {
		width: '100%',
		height: 110,
		marginBottom: 24
	},
	textarea: {
		borderRadius: 24,
		height: 104,
		overflow: 'hidden',
		borderWidth: 1,
		paddingHorizontal: 24
	}
});
