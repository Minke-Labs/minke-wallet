import React, { useState, createRef } from 'react';
import { TextInput } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';
import TextButton from '@components/TextButton';
import { ICoin, coins } from '@helpers/coins';
import ChooseQuantityModal from './ChooseQuantityModal';
import CustomAmountModal from './CustomAmountModal';
import AddFundsModal from './AddFundsModal';
import { makeStyles } from './styles';

const AddFundsButton = () => {
	const [chooseCoinVisible, setChooseCoinVisible] = useState(false);
	const showChooseCoinModal = () => setChooseCoinVisible(true);
	const hideChooseCoinModal = () => setChooseCoinVisible(false);

	const [detailsVisible, setDetailsVisible] = useState(false);
	const showDetailsModal = () => setDetailsVisible(true);
	const hideDetailsModal = () => setDetailsVisible(false);

	const [customAmountVisible, setCustomAmountVisible] = useState(false);
	const showCustomAmountModal = () => setCustomAmountVisible(true);
	const hideCustomAmountModal = () => setCustomAmountVisible(false);

	const [coin, setCoin] = useState<ICoin>(coins.ethereum);

	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [customAmount, setCustomAmount] = useState<number | null>(null);

	const customAmountRef = createRef<TextInput>();

	const selectCoin = (selectedCoin: ICoin) => {
		showDetailsModal();
		hideChooseCoinModal();
		setCoin(selectedCoin);
	};

	const backToCoinSelector = () => {
		hideDetailsModal();
		showChooseCoinModal();
		setAmount(undefined);
	};

	const backToDetails = () => {
		hideCustomAmountModal();
		hideChooseCoinModal();
		showDetailsModal();
		setCustomAmount(null);
	};

	const hideAll = () => {
		hideChooseCoinModal();
		hideDetailsModal();
		hideCustomAmountModal();
		setCustomAmount(null);
	};

	const enableCustomAmount = () => {
		setAmount(undefined);
		hideDetailsModal();
		hideChooseCoinModal();
		showCustomAmountModal();
		customAmountRef.current?.focus();
	};

	const setPresetAmount = (value: number) => {
		setAmount(value);
		setCustomAmount(null);
	};
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<>
			<Portal>
				<AddFundsModal
					visible={chooseCoinVisible}
					onDismiss={hideChooseCoinModal}
					onCloseAll={hideAll}
					onCoinSelected={selectCoin}
				/>

				<ChooseQuantityModal
					visible={detailsVisible}
					onDismiss={hideDetailsModal}
					onCloseAll={hideAll}
					onBack={backToCoinSelector}
					coin={coin}
					amount={amount}
					setPresetAmount={setPresetAmount}
					enableCustomAmount={enableCustomAmount}
				/>

				<CustomAmountModal
					visible={customAmountVisible}
					onDismiss={hideCustomAmountModal}
					onCloseAll={hideAll}
					onBack={backToDetails}
					customAmount={customAmount}
					setCustomAmount={setCustomAmount}
					customAmountRef={customAmountRef}
				/>
			</Portal>

			<TextButton
				text="Add funds"
				icon="add-circle-outline"
				containerStyle={styles.cardDivisor}
				onPress={showChooseCoinModal}
			/>
		</>
	);
};

export default AddFundsButton;
