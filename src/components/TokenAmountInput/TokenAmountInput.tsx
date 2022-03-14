import React from 'react';
import { TextInput } from 'react-native';
import { decimalSeparator } from 'expo-localization';
import { useTheme } from '@hooks';
import { TokenAmountInputProps } from './TokenAmountInput.types';

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({
	amount,
	onAmountChange,
	onNumberAmountChange,
	innerRef,
	style,
	placeholder,
	visible = true,
	isAmountValid = true,
	autoFocus = false
}) => {
	const { colors } = useTheme();
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

	return (
		<TextInput
			keyboardType="numeric"
			style={[
				style,
				{
					borderBottomColor: isAmountValid ? colors.cta2 : colors.alert1,
					display: visible ? 'flex' : 'none',
					color: colors.text1
				}
			]}
			value={amount}
			ref={innerRef}
			placeholder={placeholder}
			onChangeText={(text) => onChangeText(text)}
			autoFocus={autoFocus}
		/>
	);
};

export default TokenAmountInput;
