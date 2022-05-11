import React, { useState } from 'react';
import { View } from 'react-native';
import { decimalSeparator } from 'expo-localization';
import { Text, OnrampButton, TokenInputInner } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const LocalCurrencyModal = () => {
	const [number, onChangeNumber] = React.useState<Number>();
	const [amount, onChangeAmount] = useState('');

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
		onChangeAmount(lastValid);
		if (onChangeNumber) {
			onChangeNumber(Number(lastValid.replace(new RegExp(`\\${decimalSeparator}`), '.')));
		}
	};

	return (
		<View>
			<Text type="h3" weight="bold" marginBottom={32}>Choose another amount</Text>

			<TokenInputInner
				symbol="BRL"
				// isAmountValid={(number || 0) <= Number(token.balance)}
				isAmountValid
				placeholder="0.00"
				autoFocus
				showSymbol // Always true here
				marginBottom={32}
				amount={amount}
				onChangeText={onChangeText}
			/>

			<OnrampButton
				marginBottom={80}
				onPress={() => console.log('ONRAMP CLICKED!!', number)}
			/>

			<KeyboardSpacer />
		</View>
	);
};

export default LocalCurrencyModal;
