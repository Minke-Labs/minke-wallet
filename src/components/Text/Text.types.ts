import { StyleProp, TextStyle } from 'react-native';
import { ColorType } from '@styles';
import { fontWeight, fontType } from './Text.utils';

type FontWeightType = keyof typeof fontWeight;

type FontType = keyof typeof fontType;

interface MakeStylesProps {
	weight: FontWeightType;
	type: FontType;
	chosenColor: string;
	marginBottom: number;
	width: number | string;
	style: StyleProp<TextStyle>;
	center: boolean;
}

interface TextComponentProps {
	weight: FontWeightType;
	type: FontType;
	color: keyof ColorType;
	marginBottom: number;
	width: number | string;
	style: StyleProp<TextStyle>;
	center: boolean;
}

export type { FontWeightType, FontType, MakeStylesProps, TextComponentProps };
