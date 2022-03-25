import { IconType } from '@styles';

interface ButtonProps {
	title: string;
	iconLeft?: IconType;
	iconRight?: IconType;
	disabled?: boolean;
	mode?: string;
	marginBottom?: number;
	onPress?: () => void;
}

export type { ButtonProps };
