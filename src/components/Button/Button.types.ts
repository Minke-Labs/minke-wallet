import { IconType } from '@styles';
import { GestureResponderEvent } from 'react-native';

interface ButtonProps {
	title: string;
	iconLeft?: IconType;
	iconRight?: IconType;
	disabled?: boolean;
	mode?: string;
	onPress?: (event: GestureResponderEvent) => void;
}

export type { ButtonProps };
