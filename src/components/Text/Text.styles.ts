import { StyleSheet } from 'react-native';
import { MakeStylesProps } from './Text.types';
import { fontWeight, fontType } from './Text.utils';

export const makeStyles = ({ weight, type, chosenColor, marginBottom, width, style }: MakeStylesProps) =>
	StyleSheet.create({
		text: {
			fontFamily: fontWeight[weight],
			textAlign: 'center',
			marginBottom,
			color: chosenColor,
			...(width > 0 ? { width } : {}),
			...fontType[type],
			...{ ...(style as object) }
		}
	});
