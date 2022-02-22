import { TextProps as RNTextProps } from 'react-native';
import { ColorType } from '@styles';
import Animated from 'react-native-reanimated';
import { fontWeight, fontType } from './Text.utils';

type FontWeightType = keyof typeof fontWeight;

type FontType = keyof typeof fontType;

interface MakeStylesProps {
	weight: FontWeightType;
	type: FontType;
	chosenColor: string;
	marginBottom: number;
	width: number | string;
	center: boolean;
}

interface TextComponentProps {
	weight?: FontWeightType;
	type?: FontType;
	color?: keyof ColorType;
	marginBottom?: number;
	width?: number | string;
	style?: Animated.AnimateProps<RNTextProps>['style'];
	center?: boolean;
	text: Animated.SharedValue<string>;
}

export type { FontWeightType, FontType, MakeStylesProps, TextComponentProps };
