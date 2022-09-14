import { IconType, SpacingType } from '@styles';

export interface ButtonProps {
	title: string;
	iconLeft?: IconType;
	iconRight?: IconType;
	disabled?: boolean;
	mode?: string;
	mb?: SpacingType;
	onPress?: () => void;
	alert?: boolean;
	br?: SpacingType;
}
