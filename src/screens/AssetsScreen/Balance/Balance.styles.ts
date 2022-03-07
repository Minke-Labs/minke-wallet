import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		width: '100%',
		height: 146,
		borderRadius: 16,
		marginBottom: 16,
		overflow: 'hidden'
	},
	valueContainer: {
		flex: 1,
		paddingTop: 16,
		paddingLeft: 24,
		paddingRight: 12
	},
	valueContainerTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8
	}
});
