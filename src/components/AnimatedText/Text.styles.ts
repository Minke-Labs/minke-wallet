import { StyleSheet } from 'react-native';
import { fontWeight, fontType, FontTypeType, FontWeightType } from '@styles';
import { MakeStylesProps } from './Text.types';

export const makeStyles = ({ weight, type, chosenColor, marginBottom, width, center }: MakeStylesProps) =>
	StyleSheet.create({
		text: {
			fontFamily: fontWeight[weight as FontWeightType],
			textAlign: center ? 'center' : 'left',
			marginBottom,
			display: 'flex',
			color: chosenColor,
			...(width && { width }),
			...fontType[type as FontTypeType]
		}
	});
