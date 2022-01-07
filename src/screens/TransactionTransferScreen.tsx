import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, View } from 'react-native';
import { Appbar, Button, Card, RadioButton, Text, TextInput } from 'react-native-paper';
import { CommonActions, useRoute } from '@react-navigation/native';
import { useState } from '@hookstate/core';
import { isNaN } from 'lodash';
import AppLoading from 'expo-app-loading';
import { estimateGas, sendTransaction } from '../model/wallet';
import { globalWalletState } from '../stores/WalletStore';
import { RootRouteProps, RootStackParamList } from '../helpers/param-list-type';

export function TransactionTransferScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const route = useRoute<RootRouteProps<'TransactionTransfer'>>();
	const amount = useState('');
	const state = globalWalletState();
	const gasPrice = useState(estimateGas);
	const selectedGasPrice = useState('0');
	if (gasPrice.promised) {
		return <AppLoading />;
	}
	if (gasPrice.error) {
		return <Text>Could not get Gas Prices</Text>;
	}
	const onAmountChange = (text: string) => {
		if (!isNaN(text)) amount.set(text);
	};
	const onTransfer = async () => {
		if (state.value.wallet) {
			const contractAddress = state.value.tokens?.[route.params.coin]?.contract?.address || '';
			console.log('CONTRACT address', contractAddress);
			sendTransaction(
				state.value.wallet,
				route.params.address,
				amount.value,
				selectedGasPrice.value,
				contractAddress
			)
				.then((r) => {
					console.log(r);
					Alert.alert('Success', 'Transaction successful', [
						{
							text: 'OK',
							onPress: () =>
								navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: 'Wallet' }] }))
						}
					]);
				})
				.catch((err) => console.log(err));
		}
	};
	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header>
				<Appbar.Content title="Transfer" />
			</Appbar.Header>

			<Card style={{ flex: 1, margin: 5 }}>
				<Text>Transfer to address: {route.params.address}</Text>
				<TextInput
					keyboardType="number-pad"
					label="Amount"
					value={amount.value}
					onChangeText={onAmountChange}
				/>
				<View
					style={{
						flex: 0,
						flexBasis: 200,
						flexDirection: 'row',
						alignItems: 'flex-start',
						justifyContent: 'flex-start'
					}}
				>
					<Text>Transaction Waiting times</Text>
					<RadioButton.Group
						onValueChange={(newValue) => selectedGasPrice.set(newValue)}
						value={selectedGasPrice.value}
					>
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
							<Text>Fastest wait {gasPrice.value.fastestWait}</Text>
							<RadioButton value={gasPrice.value.fastest.toString()} />
						</View>

						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
							<Text>Fast wait{gasPrice.value.fastWait}</Text>
							<RadioButton value={gasPrice.value.fast.toString()} />
						</View>
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
							<Text>Safe low wait {gasPrice.value.safeLowWait}</Text>
							<RadioButton value={gasPrice.value.safeLow.toString()} />
						</View>
					</RadioButton.Group>
				</View>

				<Button onPress={onTransfer}>Transfer</Button>
			</Card>
		</View>
	);
}
