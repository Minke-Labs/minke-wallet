import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Headline, Text } from 'react-native-paper';
import { useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalWalletState } from '@stores/WalletStore';
import { Network, networks, network as selectedNetwork, networkSettingsKey } from '@models/network';
import Container from '@components/Container';
import { MaterialIcons } from '@expo/vector-icons';
import globalStyle from '@components/global.styles';
import styles from './styles';

const ChangeNetworkScreen = () => {
	const state = useState(globalWalletState());
	const [connectedNetwork, setConnectedNetwork] = React.useState<Network>();

	const selectNetwork = async (network: Network) => {
		try {
			await AsyncStorage.setItem(networkSettingsKey, network.id);
			state.network.set(network);
			setConnectedNetwork(network);
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
			<Headline style={globalStyle.headline}>Network</Headline>
			<SafeAreaView>
				<FlatList
					style={styles.list}
					data={Object.values(networks)}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => selectNetwork(item)} style={styles.listItem}>
							<Text style={styles.itemLabel}>{item.name}</Text>
							{item.id === connectedNetwork?.id ? <MaterialIcons name="check" size={20} /> : null}
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item.id}
				/>
			</SafeAreaView>
		</Container>
	);
};

export default ChangeNetworkScreen;
