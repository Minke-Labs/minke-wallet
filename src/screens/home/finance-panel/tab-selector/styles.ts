import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	tabActive: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: '#fff',
		fontFamily: 'Inter_800ExtraBold'
	},
	tabInactive: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16
	},
	tabTitleActive: {
		fontSize: 16,
		fontFamily: 'Inter_800ExtraBold'
	},
	tabTitleInactive: {
		fontSize: 16,
		color: '#4E5E6F'
	},
	roundInside: {
		position: 'relative',
		marginTop: 22
	}
});
