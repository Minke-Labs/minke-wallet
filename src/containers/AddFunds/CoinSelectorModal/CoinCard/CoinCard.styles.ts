import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		height: 69,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.08,
		shadowColor: '#000',
		borderRadius: 16,
		marginBottom: 8
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}
});
