import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Appbar, Button, Card, Dialog, Portal, Snackbar } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useState } from '@hookstate/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BigNumberish } from 'ethers';
import { commify, formatEther, formatUnits } from 'ethers/lib/utils';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { RootStackParamList } from '../helpers/param-list-type';
import { walletDelete } from '../model/wallet';
import { globalWalletState } from '../stores/WalletStore';

export function WalletScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const state = useState(globalWalletState());
	const snackbarVisible = useState(false);
	const dialogVisible = useState(false);

	if (state.promised) return <AppLoading />;

	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		state.set({ wallet: null, walletId: null });
		navigation.navigate('Welcome');
	}, [navigation]);

	const onCopyToClipboard = () => {
		Clipboard.setString(state.value.wallet?.address || '');
		snackbarVisible.set(true);
	};

	const onTransfer = () => {
		navigation.navigate('TransactionSelectFunds');
	};

	const onShareAddress = () => {
		dialogVisible.set(true);
	};

	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header>
				<Appbar.Content title="Minke Wallet" />
			</Appbar.Header>
			<Card style={{ padding: 20 }}>
				<Text style={{ marginBottom: 5 }}>{state.value.wallet?.address}</Text>
				<View style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Button onPress={onCopyToClipboard}>Copy to Clipboard</Button>
					<Button onPress={onShareAddress}>Share Address</Button>
					<Portal>
						<Dialog visible={dialogVisible.value} onDismiss={() => dialogVisible.set(false)}>
							{/*<Dialog.Title>Aaa</Dialog.Title>*/}
							<Dialog.Content style={{ alignItems: 'center' }}>
								<QRCode value={state.value.wallet?.address} />
							</Dialog.Content>
							<Dialog.Actions>{/*<Button onPress={hideDialog}>Done</Button>*/}</Dialog.Actions>
						</Dialog>
					</Portal>
				</View>
				<Text>
					Balance ETH: {state.value.balance?.eth ? formatEther(state.value.balance.eth as BigNumberish) : ''}
				</Text>
				<Text style={{ marginBottom: 5 }}>Balance USD: {commify(state.value.balance?.usd || '')}</Text>

				<View style={{ padding: 10 }}>
					<Text>Tokens:</Text>
					<Text>
						DAI Balance:{' '}
						{state.value.tokens?.dai?.balance ? formatUnits(state.value.tokens?.dai?.balance) : ''}
					</Text>
				</View>
				{/*        <TextInput label={'Transfer To'} value={transferTo.value.to}
                           onChangeText={address => transferTo.to.set(address)}/>
                <TextInput keyboardType={'number-pad'} label={'Amount'} value={transferTo.amount.value}
                           onChangeText={onAmountChange}/>*/}
				<Button style={{ marginBottom: 5 }} mode="contained" onPress={onTransfer}>
					Transfer
				</Button>
				<Button style={{ marginBottom: 5 }} color="red" onPress={onDeleteWallet}>
					Delete
				</Button>
			</Card>
			<Snackbar onDismiss={() => snackbarVisible.set(false)} visible={snackbarVisible.value}>
				Address Copied
			</Snackbar>
		</View>
	);
}
