import { StyleSheet } from 'react-native';
import { CURSOR } from './Cursor.utils';

export const styles = StyleSheet.create({
	cursor: {
		width: CURSOR,
		height: CURSOR,
		borderRadius: CURSOR / 2,
		backgroundColor: '#acffc74b',
		justifyContent: 'center',
		alignItems: 'center'
	},
	cursorBody: {
		width: 15,
		height: 15,
		borderRadius: 7.5
	}
});
