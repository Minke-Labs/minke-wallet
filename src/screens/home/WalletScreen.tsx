import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import { useState } from '@hookstate/core';
import { globalWalletState, emptyWallet } from '@stores/WalletStore';
import { walletCreate, walletDelete } from '@models/wallet';
import styles from './styles';
import Header from './header/Header';
import AssetsPanel from './assets-panel/AssetsPanel';
import ActionsPanel from './actions-panel/ActionsPanel';
import FinancePanel from './finance-panel/FinancePanel';

export function WalletScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const state = useState(globalWalletState());
	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		state.set(emptyWallet);
		navigation.navigate('Welcome');
	}, [navigation]);

	const onCreateWallet = useCallback(async () => {
		const newWallet = await walletCreate();
		state.set(newWallet as any);
		navigation.navigate('WalletCreated');
	}, [navigation]);

	const onExchange = () => navigation.navigate('Exchange');
	const onSettingsPress = () => navigation.navigate('Settings');
	const onSend = () => navigation.navigate('TransactionSelectFunds');
	return (
		<Container>
			<Header onSettingsPress={onSettingsPress} />
			<SafeAreaView>
				<ScrollView style={styles.homeScroll}>
					<AssetsPanel onSend={onSend} />
					<ActionsPanel
						onCreateWallet={onCreateWallet}
						onDeleteWallet={onDeleteWallet}
						onExchange={onExchange}
					/>
					<FinancePanel />
				</ScrollView>
			</SafeAreaView>
		</Container>
	);
}
