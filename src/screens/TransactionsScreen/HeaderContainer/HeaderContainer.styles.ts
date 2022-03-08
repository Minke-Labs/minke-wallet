import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		wrapper: {
			backgroundColor: colors.background3
		},
		container: {
			paddingHorizontal: 24,
			borderBottomLeftRadius: 24,
			borderBottomRightRadius: 24,
			backgroundColor: colors.background1
		}
	});
