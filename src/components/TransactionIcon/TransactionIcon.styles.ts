import { ColorType } from '@styles';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			borderRadius: 16,
			borderWidth: 1,
			justifyContent: 'center',
			alignItems: 'center',
			borderColor: colors.text3
		},
		inner: {
			width: 12,
			height: 12,
			borderRadius: 6,
			position: 'absolute',
			bottom: 0,
			right: 0
		}
	});
