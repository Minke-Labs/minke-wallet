import { StyleProp, ViewStyle } from 'react-native';
import { SpacingType, ColorType } from '@styles';

export interface ViewProps {
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
	h: number;
	w: number;

	// border radius
	br: SpacingType;

	// border width
	bw: number;

	// circle
	round: number;

	// background color
	bg: keyof ColorType;

	// flexbox
	row: boolean;
	main: 'flex-start' | 'center' | 'flex-end';
	cross: 'flex-start' | 'center' | 'flex-end';

	style: StyleProp<ViewStyle>;
}
