import { useState, useEffect } from 'react';
import { useTheme } from '@hooks';
import { decimalSeparator } from 'expo-localization';
import { ParaswapToken } from '@models/token';
import { makeStyles } from '../ExchangeScreen.styles';

interface UseTokenCardProps {
	token: ParaswapToken;
	balance: string;
	updateQuotes: Function;
	conversionAmount: string;
	disableMax: boolean;
}

export const useTokenCard = ({ balance, updateQuotes, token, conversionAmount, disableMax }: UseTokenCardProps) => {
	const [amount, setAmount] = useState('');
	// if enabled always set the max according to the balance
	const [maxModeEnabled, setMaxModeEnabled] = useState(false);
	const { colors } = useTheme();
	const styles = makeStyles(colors);

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
		setAmount(balance.replace(/\./g, decimalSeparator));
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
	}, [balance]);

	const isMaxEnabled = !disableMax && token && balance;
	const invalidAmount = isMaxEnabled && +balance < +amount.replace(/,/g, '.');

	return {
		amount,
		onChangeText,
		onMaxPress,
		isMaxEnabled,
		invalidAmount,
		styles
	};
};
