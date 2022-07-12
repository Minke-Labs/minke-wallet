import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from '@styles';

export default StyleSheet.create({
	fullScreen: {
		height: deviceHeight,
		position: 'absolute',
		top: 0,
		justifyContent: 'center'
	},
	backdrop: {
		position: 'absolute',
		height: deviceHeight,
		width: deviceWidth,
		backgroundColor: 'rgba(6, 19, 33, 0.9)'
	},
	container: {
		width: deviceWidth,
		bottom: 0,
		position: 'absolute',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		overflow: 'hidden'
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
