import React, { useEffect } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { Headline } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'old/src/helpers/param-list-type';
import { useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalWalletState, fetchTokensAndBalances } from 'old/src/stores/WalletStore';
import { Network, networks, network as selectedNetwork, networkSettingsKey } from '@src/model/network';
import Container from 'old/src/components/Container';
import ListItem from 'old/src/components/ListItem';
import globalStyle from 'old/src/components/global.styles';
import styles from './styles';

const ChangeNetworkScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const state = useState(globalWalletState());
	const { privateKey, address } = state.value;
	const [connectedNetwork, setConnectedNetwork] = React.useState<Network>();

	const selectNetwork = async (network: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, network.id);
			setConnectedNetwork(network);
			const { balance } = await fetchTokensAndBalances(privateKey, address);
			state.network.set(network);
			state.balance.set(balance);
			state.transactions.set(undefined);
			navigation.navigate('Wallet');
		} catch (e) {
			console.error('Error saving settings');
		}
	};

	useEffect(() => {
		const fetchNetwork = async () => {
			setConnectedNetwork(await selectedNetwork());
		};

		fetchNetwork();
	}, []);

	return (
		<Container>
			<View style={globalStyle.padding}>
				<Headline style={globalStyle.headline}>Network</Headline>
				<SafeAreaView>
					<FlatList
						style={styles.list}
						data={Object.values(networks)}
						renderItem={({ item }) => (
							<ListItem
								label={item.name}
								onPress={() => selectNetwork(item)}
								selected={item.id === connectedNetwork?.id}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
			</View>
		</Container>
	);
};

export default ChangeNetworkScreen;
