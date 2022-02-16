import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 60,
		width: '100%',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.08,
		shadowColor: '#000',
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24
	}
});
