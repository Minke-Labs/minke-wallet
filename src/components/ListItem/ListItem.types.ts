import { ColorType, IconType } from '@styles';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

type TagType = 'icon' | 'svg';
export interface ListItemProps {
	title: string;
	desc: string;
	iconName?: IconType;
	tagColor?: keyof ColorType;
	tagType?: TagType;
	SvgComponent?: FC<SvgProps>;
	onPress?: () => void;
}
