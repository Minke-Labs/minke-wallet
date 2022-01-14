import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { walletDelete } from '@models/wallet';
import styles from './styles';
import Header from './header/Header';
import AssetsPanel from './assets-panel/AssetsPanel';
import ActionsPanel from './actions-panel/ActionsPanel';
import FinancePanel from './finance-panel/FinancePanel';

export function WalletScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const state = useState(globalWalletState());
	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		state.set({ wallet: null, walletId: null });
		navigation.navigate('Welcome');
	}, [navigation]);

	const onExchange = () => {
		navigation.navigate('Exchange');
	};
	return (
		<Container>
			<Header />
			<SafeAreaView>
				<ScrollView style={styles.homeScroll}>
					<AssetsPanel />
					<ActionsPanel onDeleteWallet={onDeleteWallet} onExchange={onExchange} />
					<FinancePanel />
				</ScrollView>
			</SafeAreaView>
		</Container>
	);
}
