import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 60,
		width: '100%',
		shadowColor: '#000',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.08
	}
});
