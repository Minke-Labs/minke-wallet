import React, { useEffect, createRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Card, Headline, Text, IconButton } from 'react-native-paper';
import { useState, State } from '@hookstate/core';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BigNumber, utils } from 'ethers';
import { toBn } from 'evm-bn';
import Container from '@components/Container';
import PrimaryButton from '@components/PrimaryButton';
import { RootStackParamList } from '@helpers/param-list-type';
import { estimateGas, getEthLastPrice, getWalletTokens, WalletToken } from '@models/wallet';
import { ether, ParaswapToken, Quote, getExchangePrice } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { ExchangeState, globalExchangeState } from '@stores/ExchangeStore';
import SearchTokens from './SearchTokens';
import GasSelector from './GasSelector';
import TokenCard from './TokenCard';
import swapArrowDown from '../../../assets/swap-arrow-down.png';
import styles from './styles';

const ExchangeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const wallet = useState(globalWalletState());
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const [searchVisible, setSearchVisible] = React.useState(false);
	const gasPrice = useState(estimateGas);
	const gweiPrice = useState(0);

	const [fromToken, setFromToken] = React.useState<ParaswapToken>(ether);
	const [toToken, setToToken] = React.useState<ParaswapToken>();
	const [fromTokenBalance, setFromTokenBalance] = React.useState('0');
	const [toTokenBalance, setToTokenBalance] = React.useState('0');
	const [searchSource, setSearchSource] = React.useState('from');
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>();
	const [ownedTokens, setOwnedTokens] = React.useState<Array<string>>();
	const [showOnlyOwnedTokens, setShowOnlyOwnedTokens] = React.useState(true);
	const [quote, setQuote] = React.useState<Quote | null>();
	const [fromConversionAmount, setFromConversionAmount] = React.useState<string | undefined>();
	const [toConversionAmount, setToConversionAmount] = React.useState<string | undefined>();
	const fromAmountRef = createRef<TextInput>();
	const toAmountRef = createRef<TextInput>();

	const balanceFrom = (token: ParaswapToken | undefined): string => {
		if (!token) {
			return '0';
		}
		const walletToken = walletTokens?.find((owned) => owned.symbol.toLowerCase() === token.symbol.toLowerCase());
		return walletToken?.balance.toString() || '0';
	};

	const updateFromToken = (token: ParaswapToken) => {
		setFromToken(token);
		setFromTokenBalance(balanceFrom(token));
		setFromConversionAmount(undefined);
		exchange.from.set(token);
		exchange.fromAmount.set(undefined);
		fromAmountRef.current?.focus();
	};

	const updateToToken = (token: ParaswapToken) => {
		setToToken(token);
		setToConversionAmount(undefined);
		exchange.to.set(token);
		exchange.toAmount.set(undefined);
		toAmountRef.current?.focus();
	};

	const updateFromQuotes = (amount: string) => {
		// eslint-disable-next-line no-useless-escape
		const formatedValue = amount.replace(/\,/g, '.');
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
			if (quote) {
				const bigNumberAmount = toBn(formatedValue);
				let converted = quote.to[toToken?.symbol || ''].mul(bigNumberAmount);
				converted = converted.div(quote.from[fromToken.symbol]);
				const convertedAmount = utils.formatUnits(converted, toToken?.decimals);
				exchange.toAmount.set(convertedAmount);
				setToConversionAmount(convertedAmount);
			}
			exchange.fromAmount.set(formatedValue);
		}
	};

	const updateToQuotes = (amount: string) => {
		// eslint-disable-next-line no-useless-escape
		const formatedValue = amount.replace(/\,/g, '.');
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
			// 1 ETH ==== > 10 DAI
			// X ETH ==== > formatedValue DAI
			// quote.from[fromToken.symbol] ==== > quote.to[toToken?.symbol || '']
			// X                            ==== > toBn(formatedValue)
			if (quote) {
				let converted = quote.from[fromToken.symbol].mul(toBn(formatedValue));
				converted = converted.div(quote.to[toToken?.symbol || '']);
				const convertedAmount = utils.formatUnits(converted, fromToken.decimals);
				exchange.fromAmount.set(convertedAmount);
				setFromConversionAmount(convertedAmount);
			}
			exchange.toAmount.set(formatedValue);
		}
	};

	const goToExchangeResume = () => {
		navigation.navigate('ExchangeResume');
	};

	const showModal = () => {
		Keyboard.dismiss();
		setSearchVisible(true);
	};
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

	const loadPrices = async (amount?: string) => {
		const result = await getExchangePrice(fromToken.symbol, toToken?.symbol || '', amount);
		if (result.error) {
			console.error(result.error); // ESTIMATED_LOSS_GREATER_THAN_MAX_IMPACT
			Keyboard.dismiss();
			setQuote(undefined);
		} else {
			setQuote({
				from: { [fromToken.symbol]: BigNumber.from(result.priceRoute.srcAmount) },
				to: { [toToken?.symbol || '']: BigNumber.from(result.priceRoute.destAmount) }
			});
		}
	};

	const onTokenSelect = (token: ParaswapToken) => {
		hideModal();
		setQuote(null);
		if (searchSource === 'from') {
			updateFromToken(token);
		} else {
			updateToToken(token);
		}
	};

	const directionSwap = () => {
		if (fromToken && toToken && ownedTokens?.includes(toToken.symbol.toLowerCase())) {
			setQuote(null);
			const backup = fromToken;
			updateFromToken(toToken);
			updateToToken(backup);
		}
	};

	useEffect(() => {
		async function getGweiPrice() {
			const ethPrice = await getEthLastPrice();
			gweiPrice.set(+ethPrice.result.ethusd / 1000000000);
		}

		async function fetchWalletTokens() {
			// const address = wallet.value.wallet?.address || '';
			const address = '0xfe6b7a4494b308f8c0025dcc635ac22630ec7330';
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
			setOwnedTokens(tokens.map(({ symbol }) => symbol.toLowerCase()));
		}

		getGweiPrice();
		fetchWalletTokens();
	}, []);

	useEffect(() => {
		setFromTokenBalance(balanceFrom(fromToken));
		setToTokenBalance(balanceFrom(toToken));
	}, [ownedTokens]);

	useEffect(() => {
		if (fromToken && toToken) {
			loadPrices();
		}
	}, [fromToken, toToken]);

	useEffect(() => {
		if (quote) {
			if (exchange.value.fromAmount) {
				updateFromQuotes(exchange.value.fromAmount);
			} else if (exchange.value.toAmount) {
				updateToQuotes(exchange.value.toAmount);
			}
		}
	}, [quote]);

	if (gasPrice.promised) {
		return <AppLoading />;
	}
	if (gasPrice.error) {
		return <Text>Could not get Gas Prices</Text>;
	}

	const exchangeSummary = () => {
		if (fromToken && toToken && quote) {
			const destQuantity = quote.to[toToken.symbol];

			return `1 ${fromToken.symbol} = ${utils.formatUnits(destQuantity, toToken.decimals)} ${toToken.symbol}`;
		}
		return null;
	};

	if (fromToken && !exchange.value.from) {
		exchange.from.set(fromToken);
	}

	const canSwap = () =>
		quote &&
		fromToken &&
		toToken &&
		exchange.value.from &&
		exchange.value.to &&
		exchange.value.fromAmount &&
		exchange.value.toAmount &&
		+(exchange.value.fromAmount || 0) > 0 &&
		+balanceFrom(fromToken) >= +(exchange.value.fromAmount || 0);

	// this view is needed to hide the keyboard if you press outside the inputs
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<View style={styles.exchangeSection}>
					<Headline style={styles.pageTitle}>Exchange</Headline>
					<Text>{exchangeSummary()}</Text>

					<Card style={styles.tokenCard}>
						<TokenCard
							token={fromToken}
							onPress={showModalFrom}
							balance={fromTokenBalance}
							innerRef={fromAmountRef}
							updateQuotes={updateFromQuotes}
							conversionAmount={fromConversionAmount}
						/>

						<View style={styles.tokenCardDivisor}>
							<View style={styles.tokenCardDivisorBackground}>
								<Image source={swapArrowDown} style={styles.tokenCardDivisorImage} />
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.currencyIcon}>
								<MaterialIcon name="currency-usd" size={20} />
							</View>
							<TokenCard
								token={toToken}
								onPress={showModalTo}
								balance={toTokenBalance}
								innerRef={toAmountRef}
								updateQuotes={updateToQuotes}
								conversionAmount={toConversionAmount}
								disableMax
							/>
							<MaterialIcon name="chevron-right" color="#006AA6" size={20} />
						</View>
					</Card>
				</View>
				<GasSelector gasPrice={gasPrice.value} gweiPrice={gweiPrice.value} />

				<View style={styles.exchangeSection}>
					<SearchTokens
						visible={searchVisible}
						onDismiss={hideModal}
						onTokenSelect={onTokenSelect}
						ownedTokens={ownedTokens}
						showOnlyOwnedTokens={showOnlyOwnedTokens}
						selected={[fromToken?.symbol?.toLowerCase(), toToken?.symbol?.toLowerCase()]}
					/>
					<PrimaryButton onPress={goToExchangeResume} disabled={!canSwap()}>
						Exchange
					</PrimaryButton>
				</View>
			</Container>
		</TouchableWithoutFeedback>
	);
};

export default ExchangeScreen;
