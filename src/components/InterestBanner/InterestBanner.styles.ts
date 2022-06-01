import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (bold: boolean, colors: ColorType) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 4,
			paddingHorizontal: bold ? 16 : 12,
			borderRadius: bold ? 12 : 8,
			backgroundColor: bold ? '#30C061' : colors.alert4
		}
	});
