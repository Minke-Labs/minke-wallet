import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import { useState } from '@hookstate/core';
import { globalWalletState, emptyWallet, walletState } from '@stores/WalletStore';
import { walletCreate, walletDelete, getAllWallets } from '@models/wallet';
import styles from './styles';
import Header from './header/Header';
import AssetsPanel from './assets-panel/AssetsPanel';
import ActionsPanel from './actions-panel/ActionsPanel';
import FinancePanel from './finance-panel/FinancePanel';

export function WalletScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const state = useState(globalWalletState());
	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		const allWallets = (await getAllWallets()) || {};
		const wallets = Object.values(allWallets);

		if (wallets.length > 0) {
			state.set(await walletState(wallets[0]));
		} else {
			state.set(emptyWallet);
			navigation.navigate('Welcome');
		}
	}, [navigation]);

	const onCreateWallet = useCallback(async () => {
		const newWallet = await walletCreate();
		state.set(newWallet as any);
		navigation.navigate('WalletCreated');
	}, [navigation]);

	const onExchange = () => navigation.navigate('Exchange');
	const onSettingsPress = () => navigation.navigate('Settings');
	const onSend = () => navigation.navigate('TransactionSelectFunds');
	const onSwitchAccounts = () => navigation.navigate('Accounts');

	const { address, balance } = state.value;
	return (
		<Container>
			<Header onSettingsPress={onSettingsPress} />
			<SafeAreaView>
				<ScrollView style={styles.homeScroll}>
					<AssetsPanel onSend={onSend} balance={balance?.usd || ''} address={address} />
					<ActionsPanel
						onCreateWallet={onCreateWallet}
						onDeleteWallet={onDeleteWallet}
						onExchange={onExchange}
						onSwitchAccounts={onSwitchAccounts}
					/>
					<FinancePanel />
				</ScrollView>
			</SafeAreaView>
		</Container>
	);
}
