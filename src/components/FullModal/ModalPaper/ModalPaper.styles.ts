import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
	container: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		paddingVertical: 12,
		paddingHorizontal: 5,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		height: Dimensions.get('screen').height * 0.9,
		width: Dimensions.get('screen').width * 0.95,
		overflow: 'hidden'
	},
	content: {
		height: '100%',
		width: '100%'
	}
});
