import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		marginTop: 24,
		height: 129
	},
	header: {
		height: 32,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		marginBottom: 16
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	body: {
		flexDirection: 'row',
		paddingHorizontal: 24
	}
});
