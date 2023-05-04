import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	label: {
		fontSize: 12,
		lineHeight: 15,
		position: 'absolute',
		zIndex: 1,
		marginTop: 6,
		paddingLeft: 24,
		fontFamily: 'Inter_400Regular'
	},
	textarea: {
		borderRadius: 24,
		height: 136,
		minWidth: 280,
		overflow: 'hidden',
		borderWidth: 1,
		paddingHorizontal: 24,
		paddingTop: 27,
		fontSize: 16,
		fontFamily: 'Inter_500Medium'
	}
});
