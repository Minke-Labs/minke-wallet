import React, { createRef, useEffect, useState } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import { ICoin, coins } from '@helpers/coins';
import { ModalHeader, ModalReusables } from '@components';
import { useFormProgress, useNavigation, useWyreApplePay } from '@hooks';
import { UseWyreApplePayError } from '@src/hooks/useWyreApplePay/types';
import CoinSelectorModal from './CoinSelectorModal';
import ChooseQuantityModal from './ChooseQuantityModal';
import CustomAmountModal from './CustomAmountModal/CustomAmountModal';

interface AddFundsProps {
	visible: boolean;
	onDismiss: () => void;
}

const AddFunds: React.FC<AddFundsProps> = ({ visible = false, onDismiss }) => {
	const navigation = useNavigation();
	const { currentStep, reset, goForward, goBack } = useFormProgress();
	const [coin, setCoin] = useState<ICoin>(coins.ethereum);
	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [customAmount, setCustomAmount] = useState<number | null>(null);
	const [wyreError, setWyreError] = useState<UseWyreApplePayError | null>();
	const customAmountRef = createRef<TextInput>();

	const { onPurchase, orderId, error } = useWyreApplePay();

	const selectCoin = (selectedCoin: ICoin) => {
		setCoin(selectedCoin);
		goForward();
	};

	const setPresetAmount = (value: number) => {
		setAmount(value);
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
		}
	}, [visible]);

	return (
		<SafeAreaView>
			<ModalHeader onBack={currentStep > 0 ? goBack : undefined} onDismiss={dismissCoin} />
			<View style={{ paddingHorizontal: 24 }}>
				{wyreError && error ? (
					<ModalReusables.Error
						title={error.title}
						description={error.description}
						onDismiss={dismissError}
						showHeader={false}
					/>
				) : (
					<>
						{currentStep === 0 && <CoinSelectorModal onSelect={selectCoin} />}
						{currentStep === 1 && (
							<ChooseQuantityModal
								coin={coin}
								amount={amount}
								setPresetAmount={setPresetAmount}
								enableCustomAmount={enableCustomAmount}
								onPurchase={() => onPurchase({ currency: coin.symbol, value: amount || 100 })}
							/>
						)}
						{currentStep === 2 && (
							<CustomAmountModal
								customAmount={customAmount}
								setCustomAmount={setCustomAmount}
								customAmountRef={customAmountRef}
								onPurchase={() => onPurchase({ currency: coin.symbol, value: customAmount || 100 })}
							/>
						)}
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default AddFunds;
