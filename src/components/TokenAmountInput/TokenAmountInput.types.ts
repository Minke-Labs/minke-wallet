import { RefObject } from 'react';
import { TextInput } from 'react-native';

export interface TokenAmountInputProps {
	symbol: string;
	amount: string;
	onAmountChange: (amount: string) => void;
	onNumberAmountChange?: (amount: number) => void;
	visible: boolean;
	isAmountValid: boolean;
	innerRef?: RefObject<TextInput>;
	placeholder?: string;
	autoFocus?: boolean;
	onMaxPress?: (tokenValue?: boolean) => void;
	onTypeChange?: (tokenValue: boolean) => void; // token or USD selected?
}
