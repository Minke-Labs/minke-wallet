import { RefObject } from 'react';
import { TextInput, StyleProp, TextStyle } from 'react-native';

export interface TokenAmountInputProps {
	amount: string;
	onAmountChange: (amount: string) => void;
	onNumberAmountChange?: (amount: number) => void;
	visible: boolean;
	isAmountValid: boolean;
	innerRef?: RefObject<TextInput>;
	style?: StyleProp<TextStyle> | undefined;
	placeholder?: string;
	autoFocus?: boolean;
}
