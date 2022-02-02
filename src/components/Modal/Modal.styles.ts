import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: 'rgba(6, 19, 33, 0.9)'
	},
	inner: {
		width: '100%',
		bottom: 0,
		position: 'absolute',
		backgroundColor: '#F2EAE1',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},

	// ... HEADER ...
	header: {
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 32
	}
});
