import React, { useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@hooks';
import { globalWalletState, fetchTokensAndBalances } from '@stores/WalletStore';
import { Network, networks, network as selectedNetwork, networkSettingsKey } from '@models/network';
import { BasicLayout } from '@layouts';
import Logger from '@utils/logger';
import { Icon, Text } from '@components';
import ListItem from './ListItem';
import styles from './ChangeNetworkScreen.styles';

const ChangeNetworkScreen = () => {
	const navigation = useNavigation();

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
			navigation.navigate('WalletScreen');
		} catch (e) {
			Logger.error('Error saving settings');
			captureException(e);
		}
	};

	useEffect(() => {
		const fetchNetwork = async () => {
			setConnectedNetwork(await selectedNetwork());
		};

		fetchNetwork();
	}, []);

	return (
		<BasicLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
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
							token={item.nativeToken.symbol}
							testnet={item.testnet}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</BasicLayout>
	);
};

export default ChangeNetworkScreen;
