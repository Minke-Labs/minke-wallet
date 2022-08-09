import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		height: 40,
		marginBottom: 16,
		alignItems: 'center'
	},

	titlesContainer: {
		justifyContent: 'space-between',
		height: '100%',
		marginLeft: 8,
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1
	},

	titlesUpper: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	noTokenIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
