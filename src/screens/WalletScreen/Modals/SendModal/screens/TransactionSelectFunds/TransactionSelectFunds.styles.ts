import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
	},
	image: {
		width: 64,
		height: 64,
		borderRadius: 64 / 2,
		overflow: 'hidden',
		borderWidth: 3,
		borderColor: '#a3cccc',
		marginBottom: 16
	},
	title: {
		fontFamily: 'Inter_800ExtraBold',
		fontStyle: 'normal',
		fontWeight: '800',
		fontSize: 24,
		lineHeight: 29,
		color: '#05222D',
		marginBottom: 24
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
