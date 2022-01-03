import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Image } from 'react-native';
import { Headline, Card, IconButton, Portal } from 'react-native-paper';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import SearchTokens from './SearchTokens';
import GasSelector from './GasSelector';
import { RootStackParamList } from '../../helpers/param-list-type';
import { estimateGas, getEthLastPrice } from '../../model/wallet';
import swap from '../../../assets/swap.png';

const ExchangeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const [searchVisible, setSearchVisible] = React.useState(false);
	const gasPrice = useState(estimateGas);
	const gweiPrice = useState(0);

	useEffect(() => {
		async function getGweiPrice() {
			const ethPrice = await getEthLastPrice();
			gweiPrice.set(+ethPrice.result.ethusd / 1000000000);
		}

		getGweiPrice();
	}, []);

	if (gasPrice.promised) {
		return <AppLoading />;
	}
	if (gasPrice.error) {
		return <Text>Could not get Gas Prices</Text>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const goToExchangeResume = () => {
		navigation.navigate('Wallet');
	};

	const showModal = () => setSearchVisible(true);
	const hideModal = () => setSearchVisible(false);

	return (
		<>
			<Headline>Exchange</Headline>
			<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
				<Card>
					<Card.Content>
						<Text>ETH</Text>
						<IconButton icon="chevron-right" color="#D0D0D0" onPress={() => console.log('Pressed')} />
					</Card.Content>
				</Card>
				<Image source={swap} />
				<Card onPress={showModal}>
					<Card.Content>
						<Text>Choose Token</Text>
					</Card.Content>
				</Card>
			</View>

			<GasSelector gasPrice={gasPrice.value} gweiPrice={gweiPrice.value} />
			<Portal>
				<SearchTokens visible={searchVisible} onDismiss={hideModal} />
			</Portal>
		</>
	);
};

export default ExchangeScreen;
