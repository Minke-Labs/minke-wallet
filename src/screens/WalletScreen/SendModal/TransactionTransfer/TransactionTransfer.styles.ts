import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24
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
	cardImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16
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
	},
	input: {
		height: 54,
		margin: 12,
		borderBottomWidth: 2,
		borderBottomColor: '#213952',
		padding: 10,
		fontFamily: 'Inter_400Regular',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 36,
		marginBottom: 32
	}
});
