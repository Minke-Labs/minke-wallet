import { ColorType } from '@styles';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			borderWidth: 2,
			alignSelf: 'center',
			marginBottom: 24,
			borderRadius: 100,
			padding: 8
		},
		failed: {
			borderColor: colors.alert1
		}
	});
