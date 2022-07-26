import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 90,
		borderRadius: 16,
		flexDirection: 'row',
		marginBottom: 16
	},
	left: {
		flex: 1,
		borderRightWidth: 1,
		paddingVertical: 16,
		paddingLeft: 16,
		justifyContent: 'space-between'
	},
	right: {
		flex: 1,
		paddingVertical: 16,
		paddingLeft: 16,
		justifyContent: 'space-between'
	}
});
