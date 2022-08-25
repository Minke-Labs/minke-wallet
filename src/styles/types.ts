import { StyleProp, ViewStyle } from 'react-native';
import { ColorType } from './colors';
import { ShadowType } from './shadow';
import { SpacingType } from './spacing';

export interface ViewType {
	// paddings
	ph: SpacingType;
	pv: SpacingType;
	pl: SpacingType;
	pr: SpacingType;
	pt: SpacingType;
	pb: SpacingType;
	p: SpacingType;

	// margins
	mh: SpacingType;
	mv: SpacingType;
	ml: SpacingType;
	mr: SpacingType;
	mt: SpacingType;
	mb: SpacingType;
	m: SpacingType;

	// sizes
	h: number | string;
	w: number | string;

	// shadow
	s: ShadowType;

	// border radius
	br: SpacingType;

	// border top left radius
	btlr: SpacingType;

	// border top right radius
	btrr: SpacingType;

	// border width
	bw: number;

	// bordercolor
	bc: keyof ColorType;

	// circle
	round: number;

	// background color
	bgc: keyof ColorType;

	// flex: 1
	flex1: boolean;

	// flexbox
	row: boolean;
	main: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-evenly';
	cross: 'flex-start' | 'center' | 'flex-end';

	style: StyleProp<ViewStyle>;
}
