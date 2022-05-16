export interface TokenAmountInputProps {
	symbol: string;
	amount: string;
	onAmountChange: (amount: string) => void;
	onNumberAmountChange?: (amount: number) => void;
	isAmountValid: boolean;
	placeholder?: string;
	autoFocus?: boolean;
	onMaxPress?: (tokenValue?: boolean) => void;
	onTypeChange?: (tokenValue: boolean) => void; // token or USD selected?
}
