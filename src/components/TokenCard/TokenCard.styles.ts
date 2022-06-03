import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			padding: 16,
			width: '100%',
			borderRadius: 16,
			backgroundColor: colors.background5
		},
		bottomRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginTop: 4
		}
	});
