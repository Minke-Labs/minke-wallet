/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, createRef } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Portal, Modal, Text, Button, IconButton, useTheme } from 'react-native-paper';
import TextButton from '@components/TextButton';
import CurrencyInput from 'react-native-currency-input';
import { ICoin, coins } from '@helpers/coins';
import CoinSelector from './CoinSelector';
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
				<Modal
					visible={chooseCoinVisible}
					onDismiss={hideChooseCoinModal}
					contentContainerStyle={styles.modalContainerStyle}
				>
					<View style={styles.modalHeader}>
						<Text style={styles.modalHeadline}>Add funds</Text>
						<IconButton icon="close" size={24} color="#006AA6" onPress={hideAll} />
					</View>
					<Text style={styles.modalSubHeadline}>Choose which asset you&apos;d like to buy</Text>
					<CoinSelector onSelect={selectCoin} />
				</Modal>
				<Modal
					visible={detailsVisible}
					onDismiss={hideDetailsModal}
					contentContainerStyle={styles.modalContainerStyle}
				>
					<IconButton icon="chevron-left" size={20} color="#006AA6" onPress={backToCoinSelector} />
					<Image source={coin.image} />
					<Text>{coin.name}</Text>
					<IconButton icon="close" size={20} color="#006AA6" onPress={hideAll} />
					<Text>
						Buy some
						{` ${coin.symbol} `}
						with Apple Pay to start using Minke:
					</Text>
					<View>
						{[100, 200, 300].map((value) => (
							<TouchableOpacity key={value} onPress={() => setPresetAmount(value)}>
								<Text style={amount === value ? { color: 'red' } : {}}>${value}</Text>
							</TouchableOpacity>
						))}
					</View>

					<Button onPress={enableCustomAmount}>
						<Text>Choose another amount</Text>
					</Button>
				</Modal>

				<Modal
					visible={customAmountVisible}
					onDismiss={hideCustomAmountModal}
					contentContainerStyle={styles.modalContainerStyle}
				>
					<IconButton icon="chevron-left" size={20} color="#006AA6" onPress={backToDetails} />
					<Text>Choose other amount</Text>
					<IconButton icon="close" size={20} color="#006AA6" onPress={hideAll} />

					<CurrencyInput
						value={customAmount}
						onChangeValue={setCustomAmount}
						prefix="$"
						delimiter=","
						separator="."
						precision={2}
						minValue={0}
						ref={customAmountRef}
						autoFocus
						placeholder="$00.00"
					/>
				</Modal>
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
