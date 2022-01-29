import { fontWeight, fontType } from './Text.utils';

type FontWeightType = keyof typeof fontWeight;

type FontType = keyof typeof fontType;

interface MakeStylesProps {
	weight: FontWeightType;
	type: FontType;
	chosenColor: string;
	marginBottom: number;
	width: number;
}

interface TextComponentProps {
	weight: FontWeightType;
	type: FontType;
	color: keyof ReactNativePaper.ThemeColors;
	marginBottom: number;
	width: number;
}

export type { FontWeightType, FontType, MakeStylesProps, TextComponentProps };
