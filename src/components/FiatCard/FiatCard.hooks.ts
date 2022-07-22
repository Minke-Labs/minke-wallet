import { useState, useEffect } from 'react';
import { decimalSeparator } from 'expo-localization';

interface UseFiatCardProps {
	updateQuotes?: Function;
	conversionAmount: string;
}

export const useFiatCard = ({ updateQuotes, conversionAmount }: UseFiatCardProps) => {
	const [amount, setAmount] = useState('');
	// if enabled always set the max according to the balance

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
		setAmount(lastValid);
	};

	useEffect(() => {
		if (updateQuotes && !(conversionAmount && conversionAmount.replace(/\./g, decimalSeparator) === amount)) {
			updateQuotes(amount);
		}
	}, [amount]);

	useEffect(() => {
		setAmount(conversionAmount.replace(/\./g, decimalSeparator));
	}, [conversionAmount]);

	const invalidAmount = false;

	return {
		amount,
		onChangeText,
		invalidAmount
	};
};
