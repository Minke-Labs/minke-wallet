import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		width: '100%',
		borderRadius: 16,
		marginBottom: 16,
		overflow: 'hidden'
	},
	valueContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 16
	},
	valueContainerTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8
	}
});
