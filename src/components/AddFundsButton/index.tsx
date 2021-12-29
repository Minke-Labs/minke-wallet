/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, createRef } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Portal, Modal, Text, Button, IconButton } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import CoinSelector from './CoinSelector';
import { ICoin, coins } from '../../helpers/coins';

const AddFundsButton = () => {
	const [chooseCoinVisible, setChooseCoinVisible] = useState(false);
	const showChooseCoinModal = () => setChooseCoinVisible(true);
	const hideChooseCoinModal = () => setChooseCoinVisible(false);

	const [detailsVisible, setDetailsVisible] = useState(false);
	const showDetailsModal = () => setDetailsVisible(true);
	const hideDetailsModal = () => setDetailsVisible(false);

	const [coin, setCoin] = useState<ICoin>(coins.ethereum);

	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [customAmount, setCustomAmount] = useState<number | null>(null);

	const customAmountRef = createRef<TextInput>();

	const selectCoin = (selectedCoin: ICoin) => {
		showDetailsModal();
		hideChooseCoinModal();
		setCoin(selectedCoin);
	};

	const clearCoinSelection = () => {
		hideDetailsModal();
		showChooseCoinModal();
	};

	const hideAll = () => {
		hideChooseCoinModal();
		hideDetailsModal();
	};

	const enableCustomAmount = () => {
		setAmount(undefined);
		setCustomAmount(0);
		customAmountRef.current?.focus();
	};

	const setPresetAmount = (value: number) => {
		setAmount(value);
		setCustomAmount(null);
	};

	const containerStyle = { backgroundColor: 'white', padding: 20 };

	return (
		<>
			<Portal>
				<Modal
					visible={chooseCoinVisible}
					onDismiss={hideChooseCoinModal}
					contentContainerStyle={containerStyle}
				>
					<Text>Add funds</Text>
					<IconButton icon="close" size={20} color="#006AA6" onPress={hideAll} />
					<Text>Choose which asset you&apos;d like to buy</Text>
					<CoinSelector onSelect={selectCoin} />
				</Modal>
				<Modal visible={detailsVisible} onDismiss={hideDetailsModal} contentContainerStyle={containerStyle}>
					<IconButton icon="chevron-left" size={20} color="#006AA6" onPress={clearCoinSelection} />
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

					{customAmount === null ? (
						<Button onPress={enableCustomAmount}>
							<Text>Choose another amount</Text>
						</Button>
					) : null}

					<CurrencyInput
						value={customAmount}
						onChangeValue={setCustomAmount}
						prefix="$"
						delimiter=","
						separator="."
						precision={2}
						minValue={0}
						ref={customAmountRef}
						style={{ display: customAmount === null ? 'none' : 'flex' }}
					/>
				</Modal>
			</Portal>
			<Button style={{ marginBottom: 5 }} mode="contained" onPress={showChooseCoinModal}>
				Add funds
			</Button>
		</>
	);
};

export default AddFundsButton;
