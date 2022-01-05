import React, { useEffect, createRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Image, TextInput } from 'react-native';
import { Headline } from 'react-native-paper';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BigNumber, utils } from 'ethers';
import SearchTokens from './SearchTokens';
import GasSelector from './GasSelector';
import TokenCard from './TokenCard';
import { RootStackParamList } from '../../helpers/param-list-type';
import { estimateGas, getEthLastPrice, getWalletTokens, WalletToken } from '../../model/wallet';
import { ether, ParaswapToken, getExchangePrice } from '../../model/token';
import { globalWalletState } from '../../stores/WalletStore';
import swap from '../../../assets/swap.png';

const ExchangeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const wallet = useState(globalWalletState());
	const [searchVisible, setSearchVisible] = React.useState(false);
	const gasPrice = useState(estimateGas);
	const gweiPrice = useState(0);

	const [fromToken, setFromToken] = React.useState<ParaswapToken>(ether);
	const [toToken, setToToken] = React.useState<ParaswapToken>();
	const [fromTokenBalance, setFromTokenBalance] = React.useState(0);
	const [toTokenBalance, setToTokenBalance] = React.useState(0);
	const [searchSource, setSearchSource] = React.useState('from');
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>();
	const [ownedTokens, setOwnedTokens] = React.useState<Array<string>>();
	const [showOnlyOwnedTokens, setShowOnlyOwnedTokens] = React.useState(true);
	const fromAmountRef = createRef<TextInput>();
	const toAmountRef = createRef<TextInput>();

	const balanceFrom = (token: ParaswapToken | undefined): number => {
		if (!token) {
			return 0;
		}
		const walletToken = walletTokens?.find((owned) => owned.symbol.toLowerCase() === token.symbol.toLowerCase());
		return walletToken?.balance || 0;
	};

	const updateFromToken = (token: ParaswapToken) => {
		setFromToken(token);
		setFromTokenBalance(balanceFrom(token));
		fromAmountRef.current?.focus();
	};

	const updateToToken = (token: ParaswapToken) => {
		setToToken(token);
		setToTokenBalance(balanceFrom(token));
		toAmountRef.current?.focus();
	};

	useEffect(() => {
		async function getGweiPrice() {
			const ethPrice = await getEthLastPrice();
			gweiPrice.set(+ethPrice.result.ethusd / 1000000000);
		}

		async function fetchWalletTokens() {
			const address = '0xfe6b7a4494b308f8c0025dcc635ac22630ec7330';
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
			setOwnedTokens(tokens.map(({ symbol }) => symbol.toLowerCase()));
		}

		fetchWalletTokens();
		getGweiPrice();
	}, []);

	useEffect(() => {
		setFromTokenBalance(balanceFrom(fromToken));
		setToTokenBalance(balanceFrom(toToken));
	}, [ownedTokens]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const goToExchangeResume = () => {
		navigation.navigate('Wallet');
	};

	const showModal = () => setSearchVisible(true);
	const hideModal = () => setSearchVisible(false);

	const showModalFrom = (): void => {
		setShowOnlyOwnedTokens(true);
		setSearchSource('from');
		showModal();
	};

	const showModalTo = (): void => {
		setShowOnlyOwnedTokens(false);
		setSearchSource('to');
		showModal();
	};

	const loadPrices = async () => {
		const result = await getExchangePrice(fromToken.symbol, toToken?.symbol);

		console.log(
			fromToken?.symbol,
			utils.formatUnits(BigNumber.from(result.priceRoute.srcAmount), fromToken.decimals)
		);
		console.log(
			toToken?.symbol,
			utils.formatUnits(BigNumber.from(result.priceRoute.destAmount), toToken?.decimals)
		);
		console.log('==================================');
	};

	const onTokenSelect = (token: ParaswapToken) => {
		hideModal();
		if (searchSource === 'from') {
			updateFromToken(token);
		} else {
			updateToToken(token);
		}
	};

	useEffect(() => {
		if (fromToken && toToken) {
			loadPrices();
		}
	}, [fromToken, toToken]);

	const directionSwap = () => {
		if (fromToken && toToken && ownedTokens?.includes(toToken.symbol.toLowerCase())) {
			const backup = fromToken;
			updateFromToken(toToken);
			updateToToken(backup);
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
			<View style={{ flexWrap: 'wrap', flexDirection: 'row', padding: 20 }}>
				<TokenCard
					token={fromToken}
					onPress={showModalFrom}
					balance={fromTokenBalance}
					innerRef={fromAmountRef}
				/>
				<TouchableOpacity onPress={directionSwap}>
					<Image source={swap} />
				</TouchableOpacity>
				<TokenCard token={toToken} onPress={showModalTo} balance={toTokenBalance} innerRef={toAmountRef} />
			</View>
			<GasSelector gasPrice={gasPrice.value} gweiPrice={gweiPrice.value} />
			<SearchTokens
				visible={searchVisible}
				onDismiss={hideModal}
				onTokenSelect={onTokenSelect}
				ownedTokens={ownedTokens}
				showOnlyOwnedTokens={showOnlyOwnedTokens}
				selected={[fromToken?.symbol?.toLowerCase(), toToken?.symbol?.toLowerCase()]}
			/>
		</>
	);
};

export default ExchangeScreen;
