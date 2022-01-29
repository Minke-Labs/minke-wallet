import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22
	},
	title: {
		fontFamily: 'Inter_800ExtraBold',
		fontStyle: 'normal',
		fontWeight: '800',
		fontSize: 24,
		lineHeight: 29,
		color: '#05222D',
		marginBottom: 16
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44
	},
	itemContainer: {
		height: 40,
		flexDirection: 'row',
		marginBottom: 24,
		alignItems: 'center'
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16
	},
	contactTitleContainer: {
		flex: 1
	},
	contactTitle: {
		fontFamily: 'Inter_700Bold',
		fontStyle: 'normal',
		fontWeight: 'bold',
		alignItems: 'center',
		fontSize: 16,
		lineHeight: 19,
		marginBottom: 4
	}
});
