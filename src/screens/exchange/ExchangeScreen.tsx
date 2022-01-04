import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchTokens from './SearchTokens';
import GasSelector from './GasSelector';
import TokenCard from './TokenCard';
import { RootStackParamList } from '../../helpers/param-list-type';
import { estimateGas, getEthLastPrice, getWalletTokens, WalletToken } from '../../model/wallet';
import { ether, ParaswapToken } from '../../model/token';
import { globalWalletState } from '../../stores/WalletStore';
import swap from '../../../assets/swap.png';

const ExchangeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const wallet = useState(globalWalletState());
	const [searchVisible, setSearchVisible] = React.useState(false);
	const gasPrice = useState(estimateGas);
	const gweiPrice = useState(0);

	const [fromToken, setFromToken] = React.useState<ParaswapToken>(ether);
	const [toToken, setToToken] = React.useState<ParaswapToken>();
	const [searchSource, setSearchSource] = React.useState('from');
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>();
	const [ownedTokens, setOwnedTokens] = React.useState<Array<string>>();

	const resetFilterTokens = () => {
		setOwnedTokens(walletTokens?.map(({ symbol }) => symbol.toLowerCase()));
	};

	useEffect(() => {
		async function getGweiPrice() {
			const ethPrice = await getEthLastPrice();
			gweiPrice.set(+ethPrice.result.ethusd / 1000000000);
		}

		async function fetchWalletTokens() {
			const address = '0x375CC1b3574F3e5f0418D006bbADbcE5CFe13564';
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
			setOwnedTokens(tokens.map(({ symbol }) => symbol.toLowerCase()));
		}

		fetchWalletTokens();
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
		resetFilterTokens();
		showModal();
	};

	const showModalTo = (): void => {
		setSearchSource('to');
		setOwnedTokens([]);
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

	const directionSwap = () => {
		if (fromToken && toToken && ownedTokens?.includes(toToken.symbol.toLowerCase())) {
			const backup = fromToken;
			setFromToken(toToken);
			setToToken(backup);
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
				<TouchableOpacity onPress={directionSwap}>
					<Image source={swap} />
				</TouchableOpacity>
				<TokenCard token={toToken} onPress={showModalTo} />
			</View>
			<GasSelector gasPrice={gasPrice.value} gweiPrice={gweiPrice.value} />
			<SearchTokens
				visible={searchVisible}
				onDismiss={hideModal}
				onTokenSelect={onTokenSelect}
				ownedTokens={ownedTokens}
				selected={[fromToken?.symbol?.toLowerCase(), toToken?.symbol?.toLowerCase()]}
			/>
		</>
	);
};

export default ExchangeScreen;
