import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Image } from 'react-native';
import { Headline, Portal } from 'react-native-paper';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import SearchTokens from './SearchTokens';
import GasSelector from './GasSelector';
import TokenCard from './TokenCard';
import { RootStackParamList } from '../../helpers/param-list-type';
import { estimateGas, getEthLastPrice } from '../../model/wallet';
import { ether, ParaswapToken } from '../../model/token';
import swap from '../../../assets/swap.png';

const ExchangeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const [searchVisible, setSearchVisible] = React.useState(false);
	const gasPrice = useState(estimateGas);
	const gweiPrice = useState(0);

	const [fromToken, setFromToken] = React.useState<ParaswapToken>(ether);
	const [toToken, setToToken] = React.useState<ParaswapToken>();
	const [searchSource, setSearchSource] = React.useState('from');

	useEffect(() => {
		async function getGweiPrice() {
			const ethPrice = await getEthLastPrice();
			gweiPrice.set(+ethPrice.result.ethusd / 1000000000);
		}

		getGweiPrice();
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const goToExchangeResume = () => {
		navigation.navigate('Wallet');
	};

	const showModal = () => setSearchVisible(true);
	const hideModal = () => setSearchVisible(false);

	const showModalFrom = (): void => {
		setSearchSource('from');
		showModal();
	};

	const showModalTo = (): void => {
		setSearchSource('to');
		showModal();
	};

	const onTokenSelect = (token: ParaswapToken) => {
		hideModal();
		if (searchSource === 'from') {
			setFromToken(token);
		} else {
			setToToken(token);
		}
	};

	if (gasPrice.promised) {
		return <AppLoading />;
	}
	if (gasPrice.error) {
		return <Text>Could not get Gas Prices</Text>;
	}

	return (
		<>
			<Headline>Exchange</Headline>
			<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
				<TokenCard token={fromToken} onPress={showModalFrom} />
				<Image source={swap} />
				<TokenCard token={toToken} onPress={showModalTo} />
			</View>
			<GasSelector gasPrice={gasPrice.value} gweiPrice={gweiPrice.value} />
			<Portal>
				<SearchTokens visible={searchVisible} onDismiss={hideModal} onTokenSelect={onTokenSelect} />
			</Portal>
		</>
	);
};

export default ExchangeScreen;
