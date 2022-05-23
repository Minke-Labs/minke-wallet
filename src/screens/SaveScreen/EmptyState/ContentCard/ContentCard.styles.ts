import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.text6
		},
		imgContainer: {
			position: 'absolute',
			top: -60,
			width: '100%'
		},
		content: {
			width: '100%',
			paddingHorizontal: 24,
			alignItems: 'center'
		}
	});
