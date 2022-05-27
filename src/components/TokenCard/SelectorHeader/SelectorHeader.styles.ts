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
		marginLeft: 16,
		height: '100%'
	},
	titlesUpper: {
		flexDirection: 'row'
	},

	noTokenIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
