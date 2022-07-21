import { IconType, ColorType } from '@styles';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

type TagType = 'icon' | 'svg';
export interface ItemTagProps {
	iconName?: IconType;
	tagColor?: keyof ColorType;
	tagType?: TagType;
	SvgComponent?: FC<SvgProps>;
}
