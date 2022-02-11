/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import { useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import { Network, networks, network as selectedNetwork, networkSettingsKey } from '@models/network';
import { WelcomeLayout } from '@layouts';
import { Icon, Text } from '@components';
import ListItem from './ListItem';
import styles from './ChangeNetworkScreen.styles';

const ChangeNetworkScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
		<WelcomeLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6}>
					<Text weight="medium" color="text7" type="a">
						Done
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.padding}>
				<Text weight="extraBold" type="h3" marginBottom={28}>
					Network
				</Text>

				<FlatList
					data={Object.values(networks)}
					renderItem={({ item }) => (
						<ListItem
							label={item.name}
							onPress={() => selectNetwork(item)}
							selected={item.id === connectedNetwork?.id}
							token={item.defaultToken}
							testnet={item.testnet}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</WelcomeLayout>
	);
};

export default ChangeNetworkScreen;
