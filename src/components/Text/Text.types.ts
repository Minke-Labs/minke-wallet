import { StyleProp, TextStyle } from 'react-native';
import { ColorType, fontWeight, fontType } from '@styles';

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
	numberOfLines?: number;
}

export type { FontWeightType, FontType, MakeStylesProps, TextComponentProps };
