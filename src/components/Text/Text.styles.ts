import { StyleSheet } from 'react-native';
import { fontWeight, fontType } from '@styles';
import { MakeStylesProps } from './Text.types';

export const makeStyles = ({ weight, type, chosenColor, marginBottom, width, center, style }: MakeStylesProps) =>
	StyleSheet.create({
		text: {
			fontFamily: fontWeight[weight],
			textAlign: center ? 'center' : 'left',
			marginBottom,
			color: chosenColor,
			...(width && { width }),
			...fontType[type],
			...{ ...(style as object) }
		}
	});
