import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		height: 69,
		width: '100%',
		borderRadius: 16,
		backgroundColor: '#fff',
		marginBottom: 8,
		paddingLeft: 16,
		paddingRight: 24,
		flexDirection: 'row',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.08
	},
	image: {
		height: 40,
		width: 40,
		borderRadius: 20,
		marginRight: 16
	},
	title: {
		fontFamily: 'Inter_700Bold',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 19,
		alignItems: 'center',
		marginBottom: 4
	},
	subtitle: {
		fontFamily: 'Inter_700Bold',
		fontStyle: 'normal',
		fontSize: 12,
		lineHeight: 16,
		color: '#213952'
	},
	available: {
		fontFamily: 'Inter_400Regular'
	}
});
