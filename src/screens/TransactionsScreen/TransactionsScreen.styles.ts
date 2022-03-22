import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 24,
			backgroundColor: colors.background3
		}
	});
