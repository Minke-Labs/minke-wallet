import React, { createRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { ICoin, coins } from '@helpers/coins';
import { useAmplitude, useBiconomy, useFormProgress, useLanguage, useNavigation, useWyreApplePay } from '@hooks';
import { network } from '@src/model/network';
import { UseWyreApplePayError } from '@src/hooks/useWyreApplePay/types';
import { makeOrder, pickPaymentMethodFromName } from '@models/banxa';
import { globalWalletState } from '@src/stores/WalletStore';
import { useState } from '@hookstate/core';

interface UseAddFundsProps {
	onDismiss: () => void;
	visible: boolean;
}

export const useAddFunds = ({ visible, onDismiss }: UseAddFundsProps) => {
	const navigation = useNavigation();
	const { currentStep, reset, goForward, goBack, setCurrentStep } = useFormProgress();
	const [banxaModalVisible, setBanxaModalVisible] = React.useState(false);
	const [coin, setCoin] = React.useState<ICoin>(coins.usdc);
	const [amount, setAmount] = React.useState<number | undefined>(undefined);
	const [customAmount, setCustomAmount] = React.useState<number | null>(null);
	const [wyreError, setWyreError] = React.useState<UseWyreApplePayError | null>();
	const customAmountRef = createRef<TextInput>();
	const { track } = useAmplitude();
	const { locationCurrency, locationCountry } = useLanguage();
	const [orderLink, setOrderLink] = React.useState('');
	const state = useState(globalWalletState());
	const { gaslessEnabled } = useBiconomy();
	const { address } = state.value;

	const { onPurchase, orderId, error } = useWyreApplePay();

	const selectCoin = (selectedCoin: ICoin) => {
		track('Add Funds Modal - Token selected', selectedCoin);
		setCoin(selectedCoin);
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

		const params = {
			account_reference: address,
			source: locationCurrency,
			target: coin.name.toUpperCase() === 'ETHEREUM' ? 'ETH' : coin.name.toUpperCase(),
			source_amount: String(value),
			return_url_on_success: '#',
			wallet_address: address,
			payment_method_id: paymentRes.id,
			blockchain: symbol
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
		currentStep: currentStep === 0 && gaslessEnabled ? currentStep + 1 : currentStep,
		wyreError,
		error,
		orderLink,
		goBack,
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
		setBanxaModalVisible,
		gaslessEnabled
	};
};
