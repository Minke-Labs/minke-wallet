import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderStyle: 'solid'
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '70%'
	},
	tag: {
		paddingHorizontal: 8,
		borderRadius: 14
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16
	}
});
