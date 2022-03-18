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
		},
		statusIcon: {
			borderWidth: 2,
			alignSelf: 'center',
			marginBottom: 24,
			borderRadius: 100,
			padding: 8
		},
		success: {
			borderColor: colors.alert3
		},
		failed: {
			borderColor: colors.alert1
		}
	});
