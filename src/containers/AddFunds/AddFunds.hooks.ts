import React, { createRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { ICoin, coins } from '@helpers/coins';
import { useAmplitude, useBiconomy, useFormProgress, useNavigation, useWyreApplePay } from '@hooks';
import { UseWyreApplePayError } from '@src/hooks/useWyreApplePay/types';

interface UseAddFundsProps {
	onDismiss: () => void;
	visible: boolean;
}

export const useAddFunds = ({ visible, onDismiss }: UseAddFundsProps) => {
	const navigation = useNavigation();
	const { currentStep, reset, goForward, goBack } = useFormProgress();
	const [coin, setCoin] = React.useState<ICoin>(coins.usdc);
	const [amount, setAmount] = React.useState<number | undefined>(undefined);
	const [customAmount, setCustomAmount] = React.useState<number | null>(null);
	const [wyreError, setWyreError] = React.useState<UseWyreApplePayError | null>();
	const customAmountRef = createRef<TextInput>();
	const { track } = useAmplitude();
	const { gaslessEnabled } = useBiconomy();

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
		goForward();
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

	const onOnrampPurchase = (value: number) => {
		console.log('PRESSED!!! ', value);
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
		currentStep: gaslessEnabled ? currentStep + 1 : currentStep,
		wyreError,
		error,
		gaslessEnabled,
		goBack,
		dismissError,
		selectCoin,
		dismissCoin,
		onApplePayPurchase,
		onOnrampPurchase,
		setPresetAmount,
		enableCustomAmount,
		setCustomAmount
	};
};
