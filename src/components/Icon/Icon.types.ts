import { IconType } from '@styles';
import { StyleProp, ViewStyle } from 'react-native';

export interface IconProps {
	name: IconType;
	color: keyof ReactNativePaper.ThemeColors;
	size: number;
	style?: StyleProp<ViewStyle>;
}
