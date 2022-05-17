import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		width: '100%',
		height: 55,
		marginBottom: 16,
		borderRadius: 16,
		paddingVertical: 8,
		paddingHorizontal: 24,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	leftContainer: {
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1.3
	},
	centerContainer: {
		flex: 0.4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	rightContainer: {
		height: '100%',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		flex: 1.3
	}
});
