import React, { useEffect } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { useState } from '@hookstate/core';
import { Headline } from 'react-native-paper';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import ListItem from '@components/ListItem';
import Container from '@components/Container';
import globalStyle from '@components/global.styles';
import { walletState, globalWalletState } from '@src/stores/WalletStore';

const AccountsScreen = () => {
	const state = useState(globalWalletState());
	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, []);

	const onSelectWallet = (wallet: MinkeWallet) => {
		state.set(walletState(wallet));
	};

	const { address } = state.value;

	return (
		<Container>
			<Headline style={globalStyle.headline}>Accounts</Headline>
			<SafeAreaView>
				<FlatList
					style={{ padding: 20 }}
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
		</Container>
	);
};

export default AccountsScreen;
