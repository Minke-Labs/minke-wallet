import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 32
	},

	leftContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	settingsIcon: {
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		borderStyle: 'solid'
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	imageBg: {
		borderRadius: 12,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
