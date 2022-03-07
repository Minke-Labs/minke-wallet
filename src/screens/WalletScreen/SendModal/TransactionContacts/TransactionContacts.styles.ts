import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22
	},
	title: {
		fontFamily: 'Inter_800ExtraBold',
		fontStyle: 'normal',
		fontWeight: '800',
		fontSize: 24,
		lineHeight: 29,
		marginBottom: 16
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44
	},

	// ITEM.TSX
	itemContainer: {
		height: 40,
		flexDirection: 'row',
		marginBottom: 24,
		alignItems: 'center'
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16
	},
	contactTitleContainer: {
		flex: 1,
		justifyContent: 'space-between'
	},
	contactTitle: {
		fontFamily: 'Inter_700Bold',
		fontStyle: 'normal',
		fontWeight: 'bold',
		alignItems: 'center',
		fontSize: 16,
		lineHeight: 19,
		marginBottom: 4
	},

	contactsList: {
		maxHeight: Dimensions.get('screen').height * 0.4
	}
});
