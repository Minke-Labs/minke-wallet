import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	list: {
		padding: 20
	},
	listItem: {
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: '#FFFFFF',
		marginBottom: 10,
		paddingBottom: 15
	},
	itemLabel: {
		fontSize: 16,
		fontWeight: '700',
		fontFamily: 'Inter_500Medium' // @Avelar: its 700 normal on Figma but our 700 is bold
	}
});
