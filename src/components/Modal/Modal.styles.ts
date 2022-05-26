import { StyleSheet, Dimensions, Platform } from 'react-native';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
	fullScreen: {
		height: screen.height,
		position: 'absolute',
		top: 0,
		justifyContent: 'center'
	},
	backdrop: {
		position: 'absolute',
		height: screen.height,
		width: screen.width,
		backgroundColor: 'rgba(6, 19, 33, 0.9)'
	},
	container: {
		minHeight: Platform.OS === 'android' ? 400 : undefined,
		width: screen.width,
		bottom: 0,
		position: 'absolute',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},

	// ... HEADER ...
	header: {
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 32
	}
});
