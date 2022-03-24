import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			flexDirection: 'row',
			padding: 10,
			backgroundColor: colors.background1,
			alignItems: 'center'
		}
	});
