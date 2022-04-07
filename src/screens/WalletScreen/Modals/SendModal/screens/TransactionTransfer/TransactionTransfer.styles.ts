import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	imageContainer: {
		flexDirection: 'row',
		marginBottom: 16
	},
	image: {
		width: 64,
		height: 64,
		borderRadius: 32,
		overflow: 'hidden',
		borderWidth: 3,
		borderColor: '#a3cccc'
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
	titleHighlight: {
		color: '#006AA6'
	},
	cardTitle: {
		fontFamily: 'Inter_700Bold',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 19,
		alignItems: 'center',
		color: '#05222D',
		marginBottom: 4
	},
	cardDesc: {
		fontFamily: 'Inter_500Medium',
		fontStyle: 'normal',
		fontSize: 12,
		lineHeight: 16,
		color: '#213952'
	},
	cardContainer: {
		flexDirection: 'row',
		marginBottom: 35
	}
});
