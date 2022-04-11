import { decimalSeparator } from 'expo-localization';
import { useEffect, useState } from 'react';

interface UseTokenAmountInputProps {
	amount: string;
	onAmountChange: (amount: string) => void;
	onNumberAmountChange: ((amount: number) => void) | undefined;
	onTypeChange: ((tokenValue: boolean) => void) | undefined;
}

export const useTokenAmountInput = ({
	amount,
	onAmountChange,
	onNumberAmountChange,
	onTypeChange
}: UseTokenAmountInputProps) => {
	const [showSymbol, setShowSymbol] = useState(true);

	const onChangeText = (value: string) => {
		let lastValid = amount;
		let validNumber;
		if (decimalSeparator === ',') {
			validNumber = /^\d*,?\d*$/; // for comma
		} else {
			validNumber = /^\d*\.?\d*$/; // for dot
		}

		if (validNumber.test(value)) {
			lastValid = value;
		} else {
			lastValid = amount;
		}
		onAmountChange(lastValid);
		if (onNumberAmountChange) {
			onNumberAmountChange(Number(lastValid.replace(new RegExp(`\\${decimalSeparator}`), '.')));
		}
	};

	useEffect(() => {
		if (onTypeChange) onTypeChange(showSymbol);
	}, [showSymbol]);

	return { onChangeText, showSymbol, setShowSymbol };
};
