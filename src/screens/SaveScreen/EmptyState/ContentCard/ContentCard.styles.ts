import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			width: '100%',
			alignItems: 'center',
			paddingHorizontal: 24,
			backgroundColor: colors.text6
		},
		imgContainer: {
			position: 'absolute',
			top: -60
		}
	});
