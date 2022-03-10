/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
import React, { RefObject } from 'react';
import { TextInput, StyleProp, TextStyle } from 'react-native';
import { decimalSeparator } from 'expo-localization';
import { useTheme } from '@hooks';

const TokenAmountInput = ({
	amount,
	onAmountChange,
	onNumberAmountChange,
	innerRef,
	style,
	placeholder,
	visible = true,
	isAmountValid = true,
	autoFocus = false
}: {
	amount: string;
	onAmountChange: (amount: string) => void;
	onNumberAmountChange?: (amount: number) => void;
	visible: boolean;
	isAmountValid: boolean;
	innerRef?: RefObject<TextInput>;
	style?: StyleProp<TextStyle> | undefined;
	placeholder?: string;
	autoFocus?: boolean;
}) => {
	const { colors } = useTheme();
	const onChangeText = (value: string) => {
		let lastValid = amount;
		let validNumber;
		if (decimalSeparator === ',') {
			validNumber = new RegExp(/^\d*\,?\d*$/); // for comma
		} else {
			validNumber = new RegExp(/^\d*\.?\d*$/); // for dot
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
					borderBottomColor: isAmountValid ? '#D0D0D0' : 'red',
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
