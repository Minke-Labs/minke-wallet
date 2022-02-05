/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Appbar, Button, Card } from 'react-native-paper';
import { RootStackParamList } from 'old/src/helpers/param-list-type';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BigNumberish } from 'ethers';
import { globalWalletState } from '@src/stores/WalletStore';

export function TransactionSelectFundsScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const wallet = globalWalletState();
	const onSelectFunds = (coin = 'eth') => {
		navigation.navigate('TransactionContacts', { coin });
	};
	const balance = wallet.value.balance ? formatEther(wallet.value.balance.eth as BigNumberish) : '';

	return (
		<View>
			<Appbar.Header>
				<Appbar.Content title="Select Funds" />
			</Appbar.Header>
			<Card style={{ padding: 20 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'flex-start'
					}}
				>
					<View>
						<Text>Ethereum</Text>
						<Text>Balance: {balance}</Text>
						<Text>Balance USD: {wallet.value.balance?.usd}</Text>
					</View>

					<Button mode="contained" onPress={() => onSelectFunds()}>
						Select
					</Button>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'flex-start'
					}}
				>
					<View>
						<Text>DAI</Text>
						<Text>Balance: {formatUnits(wallet.value.tokens?.dai.balance || '')}</Text>
					</View>

					<Button mode="contained" onPress={() => onSelectFunds('dai')}>
						Select
					</Button>
				</View>
			</Card>
		</View>
	);
}
