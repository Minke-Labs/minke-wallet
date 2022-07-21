import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { decimalSeparator } from 'expo-localization';
import { Text, OnrampButton, TokenInputInner } from '@components';
import { useLanguage } from '@hooks';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { pickPaymentMethodFromName } from '@models/banxa';

interface LocalCurrencyModalProps {
	onOnramp: (val: number) => void;
}

const LocalCurrencyModal: React.FC<LocalCurrencyModalProps> = ({ onOnramp }) => {
	const { i18n, locationCountry } = useLanguage();
	const [number, onChangeNumber] = useState<number>();
	const [amount, onChangeAmount] = useState('');
	const [paymentMethodId, onChangePaymentMethodId] = useState<any>();

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

	useEffect(() => {
		const fetchPaymentMethodId = async () => {
			const res = await pickPaymentMethodFromName(locationCountry.paymentName);
			onChangePaymentMethodId(res);
		};
		fetchPaymentMethodId();
	}, []);

	const isAmountValid = Number(amount) >= paymentMethodId?.minTopup;
	return (
		<View>
			<Text type="h3" weight="bold" marginBottom={32}>
				{i18n.t('Containers.AddFunds.LocalCurrencyModal.choose_amount_in', {
					currency: locationCountry!.currency
				})}
			</Text>
			<TokenInputInner
				symbol={locationCountry!.currency}
				isAmountValid={isAmountValid}
				placeholder="0.00"
				autoFocus
				showSymbol
				marginBottom={8}
				amount={amount}
				onChangeText={onChangeText}
			/>
			{paymentMethodId && (
				<Text color="text2" type="span" marginBottom={32}>
					Min {paymentMethodId!.minTopup} {locationCountry!.currency}
				</Text>
			)}
			<OnrampButton marginBottom={80} disabled={!isAmountValid} onPress={() => onOnramp(number || 0)} />

			<KeyboardSpacer />
		</View>
	);
};

export default LocalCurrencyModal;
