import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingLeft: 24,
		paddingRight: 32
	},

	indicatorContainer: {
		height: 6,
		width: 36,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	indicatorLeft: {
		width: 24,
		height: '100%',
		borderRadius: 21
	},

	indicatorRight: {
		width: 6,
		height: 6,
		borderRadius: 3
	}
});
