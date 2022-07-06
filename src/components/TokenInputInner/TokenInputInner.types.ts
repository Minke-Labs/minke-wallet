import { RefObject } from 'react';
import { TextInput } from 'react-native';

export interface TokenInputInnerProps {
	symbol: string;
	amount: string;
	isAmountValid: boolean;
	innerRef?: RefObject<TextInput>;
	placeholder?: string;
	autoFocus?: boolean;
	showSymbol?: boolean;
	onChangeText?: (text: string) => void;
	marginBottom?: number;
	ghost?: boolean;
}
