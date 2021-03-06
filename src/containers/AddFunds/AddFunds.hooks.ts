import React, { createRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { ICoin, coins } from '@helpers/coins';
import {
	useAmplitude,
	useFormProgress,
	useLanguage,
	useNavigation,
	useWyreApplePay,
	useWalletState
} from '@hooks';
import { network } from '@src/model/network';
import { UseWyreApplePayError } from '@src/hooks/useWyreApplePay/types';
import { makeOrder, pickPaymentMethodFromName } from '@models/banxa';
import * as Linking from 'expo-linking';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

interface UseAddFundsProps {
	onDismiss: () => void;
	visible: boolean;
}

export const useAddFunds = ({ visible, onDismiss }: UseAddFundsProps) => {
	const navigation = useNavigation();
	const {
		network: { topUpToken }
	} = useState(globalWalletState()).value;
	const { currentStep, reset, goForward, setCurrentStep } = useFormProgress();
	const [banxaModalVisible, setBanxaModalVisible] = React.useState(false);
	const [coin, setCoin] = React.useState<ICoin>(coins.usdc);
	const [amount, setAmount] = React.useState<number | undefined>(undefined);
	const [customAmount, setCustomAmount] = React.useState<number | null>(null);
	const [wyreError, setWyreError] = React.useState<UseWyreApplePayError | null>();
	const customAmountRef = createRef<TextInput>();
	const { track } = useAmplitude();
	const { locationCurrency, locationCountry } = useLanguage();
	const [orderLink, setOrderLink] = React.useState('');
	const { state } = useWalletState();
	const { address } = state.value;

	const { onPurchase, orderId, error } = useWyreApplePay();

	const selectCoin = () => {
		track('Add Funds Modal - Buy USDC');
		const coinObj = {
			symbol: topUpToken.symbol,
			image: topUpToken.name.toLowerCase(),
			name: topUpToken.name
		};
		setCoin(coinObj);
		goForward();
	};

	const setPresetAmount = (value: number) => {
		setAmount(value);
		track('Add Funds Modal - Amount selected', { value });
		setCustomAmount(null);
	};

	const enableCustomAmount = () => {
		setAmount(undefined);
		customAmountRef.current?.focus();
		setCurrentStep(2);
	};

	const dismissCoin = () => {
		reset();
		setWyreError(null);
		onDismiss();
	};

	const dismissError = () => {
		dismissCoin();
	};

	const onApplePayPurchase = (value: number) => {
		track('Started Apple Pay Payment', { currency: coin.symbol, value });
		onPurchase({ currency: coin.symbol, value });
	};

	const onOnrampPurchase = async (value: number) => {
		const {
			nativeToken: { symbol }
		} = await network();

		const paymentRes = await pickPaymentMethodFromName(locationCountry.paymentName);

		const cancelURL = Linking.createURL('test');

		const params = {
			account_reference: address,
			source: locationCurrency,
			target: coin.name.toUpperCase() === 'ETHEREUM' ? 'ETH' : coin.name.toUpperCase(),
			source_amount: String(value),
			return_url_on_success: '#',
			return_url_on_cancelled: cancelURL,
			wallet_address: address,
			payment_method_id: paymentRes.id,
			blockchain: symbol,
			meta_data: JSON.stringify({ address, cancelURL })
		};

		const url = await makeOrder({ params });
		setOrderLink(url);
		setBanxaModalVisible(true);
	};

	useEffect(() => {
		if (orderId) {
			dismissCoin();
			navigation.navigate('TopUpWaitScreen');
		}
	}, [orderId]);

	useEffect(() => {
		if (error) {
			setWyreError(error);
		}
	}, [error]);

	useEffect(() => {
		if (!visible) {
			setWyreError(null);
			reset();
		} else {
			track('Add Funds Modal Opened');
		}
	}, [visible]);

	return {
		coin,
		amount,
		customAmount,
		customAmountRef,
		currentStep,
		wyreError,
		error,
		orderLink,
		setCurrentStep,
		dismissError,
		selectCoin,
		dismissCoin,
		onApplePayPurchase,
		onOnrampPurchase,
		setPresetAmount,
		enableCustomAmount,
		setCustomAmount,
		banxaModalVisible,
		setBanxaModalVisible
	};
};
