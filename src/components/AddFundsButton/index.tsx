/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, createRef } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Portal, Modal, Text, Button, IconButton, useTheme } from 'react-native-paper';
import TextButton from '@components/TextButton';
import CurrencyInput from 'react-native-currency-input';
import { ICoin, coins } from '@helpers/coins';
import RoundButton from '@components/RoundButton';
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
					<View style={styles.modalHeader}>
						<IconButton icon="chevron-left" size={24} color="#006AA6" onPress={backToCoinSelector} />
						<IconButton icon="close" size={24} color="#006AA6" onPress={hideAll} />
					</View>

					<View style={styles.modalCoinDetails}>
						<Image source={coin.image} />
						<Text style={styles.modalCoinDetailsCoinName}>{coin.name}</Text>
					</View>

					<Text style={styles.modalSubHeadline}>
						Buy some
						{` ${coin.symbol} `}
						with <Text style={styles.fontBold}>Apple Pay</Text> to start using Minke:
					</Text>

					<View style={styles.modalAmountContainer}>
						{[100, 200, 300].map((value) => (
							<TouchableOpacity
								key={value}
								onPress={() => setPresetAmount(value)}
								style={styles.modalAmountSelectButton}
							>
								<Text style={amount === value ? { color: 'red', fontSize: 24 } : { fontSize: 24 }}>
									${value}
								</Text>
							</TouchableOpacity>
						))}
					</View>
					{/* Rever esse comportamento do RoundButton -
					não deveria conter um marginRight com Marquinhos, depois remover esse marginRight: -16 */}
					<View style={{ marginRight: -16 }}>
						<RoundButton text="Choose another amount" icon="" onPress={enableCustomAmount} />
					</View>
				</Modal>

				<Modal
					visible={customAmountVisible}
					onDismiss={hideCustomAmountModal}
					contentContainerStyle={styles.modalContainerStyle}
				>
					<View style={styles.modalHeader}>
						<IconButton icon="chevron-left" size={24} color="#006AA6" onPress={backToDetails} />
						<IconButton icon="close" size={24} color="#006AA6" onPress={hideAll} />
					</View>

					<Text style={styles.modalHeadline}>Choose other amount</Text>

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
						style={styles.currencyInput}
					/>

					<RoundButton text="Choose other amount" icon="" />
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
