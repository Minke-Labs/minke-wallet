import { StyleSheet } from 'react-native';
import { MakeStylesProps } from './Text.types';
import { fontWeight, fontType } from './Text.utils';

export const makeStyles = ({ weight, type, chosenColor, marginBottom, width, center }: MakeStylesProps) =>
	StyleSheet.create({
		text: {
			fontFamily: fontWeight[weight],
			textAlign: center ? 'center' : 'left',
			marginBottom,
			display: 'flex',
			color: chosenColor,
			...(width && { width }),
			...fontType[type]
		}
	});
