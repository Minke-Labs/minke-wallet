import { StyleSheet } from 'react-native';
import { BUTTON_WIDTH } from './Selector.utils';

export const styles = StyleSheet.create({
	container: {
		width: 96,
		height: '100%',
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center'
	},
	backgroundTag: {
		position: 'absolute',
		backgroundColor: '#006AA6',
		width: BUTTON_WIDTH,
		height: 16,
		borderRadius: 16
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
