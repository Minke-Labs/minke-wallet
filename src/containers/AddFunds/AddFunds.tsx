import React, { createRef, useEffect, useState } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import { ICoin, coins } from '@helpers/coins';
import { ModalHeader } from '@components';
import { useFormProgress, useNavigation, useWyreApplePay } from '@hooks';
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
	const customAmountRef = createRef<TextInput>();

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
		onDismiss();
	};

	const { onPurchase, orderId } = useWyreApplePay();

	useEffect(() => {
		if (orderId) {
			dismissCoin();
			navigation.navigate('TopUpWaitScreen');
		}
	}, [orderId]);

	useEffect(() => {
		if (!visible) {
			reset();
		}
	}, [visible]);

	return (
		<SafeAreaView>
			<ModalHeader onBack={currentStep > 0 ? goBack : undefined} onDismiss={dismissCoin} />
			<View style={{ paddingHorizontal: 24 }}>
				{currentStep === 0 && <CoinSelectorModal onSelect={selectCoin} />}
				{currentStep === 1 && (
					<ChooseQuantityModal
						coin={coin}
						amount={amount}
						setPresetAmount={setPresetAmount}
						enableCustomAmount={enableCustomAmount}
						onPurchase={() => onPurchase({ currency: coin.symbol, value: amount })}
					/>
				)}
				{currentStep === 2 && (
					<CustomAmountModal
						customAmount={customAmount}
						setCustomAmount={setCustomAmount}
						customAmountRef={customAmountRef}
						onPurchase={() => onPurchase({ currency: coin.symbol, value: customAmount })}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default AddFunds;
