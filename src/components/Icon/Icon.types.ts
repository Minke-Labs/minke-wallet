import { IconType, ColorType } from '@styles';
import { StyleProp, ViewStyle } from 'react-native';

export interface IconProps {
	name: IconType;
	color: keyof ColorType;
	size: number;
	style?: StyleProp<ViewStyle>;
}
