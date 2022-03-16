import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';
import { addColorOpacity } from '@helpers/utilities';

export const makeStyles = (colors: ColorType, percChange: boolean, color: string) =>
	StyleSheet.create({
		container: {
			padding: 12,
			borderRadius: 16,
			marginRight: 8,
			// backgroundColor: addColorOpacity(percChange ? colors.alert3 : colors.alert1, 0.1)
			backgroundColor: addColorOpacity(color, 0.1)
		}
	});
