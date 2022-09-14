import { StyleSheet } from 'react-native';
import { fontWeight, fontType, spacing } from '@styles';
import { MakeStylesProps } from './Text.types';

export const makeStyles = ({ weight, type, chosenColor, marginBottom, width, center, mb, style }: MakeStylesProps) =>
	StyleSheet.create({
		text: {
			fontFamily: fontWeight[weight],
			textAlign: center ? 'center' : 'left',
			color: chosenColor,
			...(width && { width }),
			...fontType[type],
			...(!!mb && { marginBottom: spacing[mb] }),
			...(!!marginBottom && { marginBottom }), // @@@ TEMP - For the older components
			...{ ...(style as object) }
		}
	});
