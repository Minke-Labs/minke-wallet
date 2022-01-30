import { IconType } from '@styles';

export interface IconProps {
	name: IconType;
	color: keyof ReactNativePaper.ThemeColors;
	size: number;
}
