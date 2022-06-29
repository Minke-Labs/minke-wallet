import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		icon: {
			padding: 8,
			borderRadius: 50,
			marginLeft: 8,
			marginRight: 16,
			backgroundColor: colors.background6
		}
	});
