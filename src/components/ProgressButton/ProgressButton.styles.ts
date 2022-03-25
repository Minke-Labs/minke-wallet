import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	startCounterButton: {
		backgroundColor: '#006AA6',
		marginTop: 40,
		borderRadius: 30,
		height: 50,
		overflow: 'hidden'
	},
	startCounterButtonTextContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	startCounterButtonText: {
		color: 'white',
		fontWeight: 'bold'
	}
});
