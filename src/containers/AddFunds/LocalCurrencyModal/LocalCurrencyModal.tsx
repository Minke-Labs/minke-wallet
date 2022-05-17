import React, { useState } from 'react';
import { View } from 'react-native';
import { decimalSeparator } from 'expo-localization';
import { Text, OnrampButton, TokenInputInner } from '@components';
import { useLanguage } from '@hooks';
import KeyboardSpacer from 'react-native-keyboard-spacer';

interface LocalCurrencyModalProps {
	onOnramp: (val: number) => void;
}

const LocalCurrencyModal: React.FC<LocalCurrencyModalProps> = ({ onOnramp }) => {
	const { i18n, locationCountry } = useLanguage();
	const [number, onChangeNumber] = useState<number>();
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
			<Text type="h3" weight="bold" marginBottom={32}>
				{i18n.t('Containers.AddFunds.LocalCurrencyModal.choose_another_amount')}
			</Text>

			<TokenInputInner
				symbol={locationCountry!.currency}
				isAmountValid={amount >= locationCountry!.minTopup}
				placeholder="0.00"
				autoFocus
				showSymbol
				marginBottom={32}
				amount={amount}
				onChangeText={onChangeText}
			/>

			<OnrampButton
				marginBottom={80}
				onPress={() => onOnramp(number || 0)}
			/>

			<KeyboardSpacer />
		</View>
	);
};

export default LocalCurrencyModal;