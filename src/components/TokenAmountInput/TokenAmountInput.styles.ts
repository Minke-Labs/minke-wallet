import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		marginBottom: 18
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 2
	},
	input: {
		flex: 1,
		height: 54,
		fontFamily: 'Inter_400Regular',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 36
	},
	buttonsContainer: {
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	touchable: {
		flexDirection: 'row'
	}
});
