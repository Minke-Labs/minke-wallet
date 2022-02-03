import React, { useEffect } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { useState } from '@hookstate/core';
import { Headline } from 'react-native-paper';
import { MinkeWallet, getAllWallets, saveAllWallets, AllMinkeWallets } from '@src/model/wallet';
import ListItem from 'old/src/components/ListItem';
import Container from 'old/src/components/Container';
import { find } from 'lodash';
import globalStyle from 'old/src/components/global.styles';
import { walletState, globalWalletState } from 'old/src/stores/WalletStore';

const AccountsScreen = () => {
	const state = useState(globalWalletState());
	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();
	const { address } = state.value;

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, [address]);

	const onSelectWallet = async (wallet: MinkeWallet) => {
		const allWallets = wallets || {};
		const chosen = wallet;
		const primaryWallet = find(allWallets, (w) => w.primary);
		if (primaryWallet) {
			primaryWallet.primary = false;
			allWallets[primaryWallet.id] = primaryWallet;
		}
		chosen.primary = true;
		allWallets[chosen.id] = chosen;
		await saveAllWallets(allWallets);
		state.set(walletState(wallet));
	};

	return (
		<Container>
			<View style={globalStyle.padding}>
				<Headline style={globalStyle.headline}>Accounts</Headline>
				<SafeAreaView>
					<FlatList
						style={{ paddingTop: 24, paddingBottom: 24 }}
						data={Object.values(wallets || {})}
						renderItem={({ item }) => (
							<ListItem
								label={item.address}
								selected={item.address === address}
								onPress={() => onSelectWallet(item)}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
			</View>
		</Container>
	);
};

export default AccountsScreen;
