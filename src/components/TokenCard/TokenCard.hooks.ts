import { useState, useEffect } from 'react';
import { decimalSeparator } from 'expo-localization';
import { MinkeGasToken } from '@models/types/token.types';

interface UseTokenCardProps {
	token: MinkeGasToken | undefined;
	updateQuotes?: Function;
	conversionAmount: string;
	disableMax: boolean;
}

export const useTokenCard = ({ updateQuotes, token, conversionAmount, disableMax }: UseTokenCardProps) => {
	const [amount, setAmount] = useState('');
	// if enabled always set the max according to the balance
	const [maxModeEnabled, setMaxModeEnabled] = useState(false);
	const { balance = '0', balanceAvailable } = token || {};

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
		setMaxModeEnabled(false);
	};

	const onMaxPress = () => {
		setMaxModeEnabled(true);
		setAmount((balanceAvailable || balance).replace(/\./g, decimalSeparator));
	};

	useEffect(() => {
		setAmount('');
		setMaxModeEnabled(false);
		if (updateQuotes) {
			updateQuotes('');
		}
	}, [token]);

	useEffect(() => {
		if (updateQuotes && !(conversionAmount && conversionAmount.replace(/\./g, decimalSeparator) === amount)) {
			updateQuotes(amount);
		}
	}, [amount]);

	useEffect(() => {
		setAmount(conversionAmount.replace(/\./g, decimalSeparator));
	}, [conversionAmount]);

	useEffect(() => {
		if (maxModeEnabled && !disableMax && conversionAmount) {
			onMaxPress();
		}
	}, [balance, balanceAvailable]);

	const isMaxEnabled = !disableMax && token && balance;
	const invalidAmount = +(balanceAvailable || balance) < +amount.replace(/,/g, '.');

	return {
		amount,
		onChangeText,
		onMaxPress,
		isMaxEnabled,
		invalidAmount
	};
};
