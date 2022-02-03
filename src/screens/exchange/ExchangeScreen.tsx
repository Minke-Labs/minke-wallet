import React, { useEffect, createRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Card, Headline, Text, useTheme } from 'react-native-paper';
import { useState, State } from '@hookstate/core';
import { Svg, Path } from 'react-native-svg';
import AppLoading from 'expo-app-loading';
import { BigNumber, utils } from 'ethers';
import { toBn } from 'evm-bn';
import Container from '@components/Container';
import PrimaryButton from '@components/PrimaryButton';
import { RootStackParamList } from '@helpers/param-list-type';
import { estimateGas, getEthLastPrice, getWalletTokens, WalletToken } from '@models/wallet';
import { ParaswapToken, Quote, getExchangePrice, nativeTokens, NativeTokens } from '@models/token';
import { network } from '@src/model/network';
import { globalWalletState } from '@stores/WalletStore';
import { ExchangeState, globalExchangeState } from '@stores/ExchangeStore';
import globalStyles from '@src/components/global.styles';
import SearchTokens from './search-tokens/SearchTokens';
import GasSelector from './GasSelector';
import TokenCard from './TokenCard';
import { makeStyles } from './styles';

const ExchangeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const wallet = useState(globalWalletState());
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const [searchVisible, setSearchVisible] = React.useState(false);
	const gweiPrice = useState(0);

	const [fromToken, setFromToken] = React.useState<ParaswapToken>({} as ParaswapToken);
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

	const { colors } = useTheme();
	const styles = makeStyles(colors);

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
			if (quote) {
				const bigNumberAmount = toBn(formatedValue);
				let converted = quote.to[toToken?.symbol || ''].mul(bigNumberAmount);
				converted = converted.div(quote.from[fromToken.symbol]);
				const convertedAmount = utils.formatUnits(converted, toToken?.decimals);
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
		const {
			error,
			priceRoute: { srcAmount, destAmount }
		} = await getExchangePrice(fromToken.symbol, toToken?.symbol || '', amount);
		if (error) {
			console.error(error); // ESTIMATED_LOSS_GREATER_THAN_MAX_IMPACT
			Keyboard.dismiss();
			setQuote(undefined);
		} else {
			setQuote({
				from: { [fromToken.symbol]: BigNumber.from(srcAmount) },
				to: { [toToken?.symbol || '']: BigNumber.from(destAmount) }
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

	const canChangeDirections = fromToken && toToken && ownedTokens?.includes(toToken.symbol.toLowerCase());
	const directionSwap = () => {
		if (canChangeDirections) {
			exchange.set({} as ExchangeState);
			setQuote(null);
			const backup = fromToken;
			updateFromToken(toToken);
			updateToToken(backup);
		}
	};

	useEffect(() => {
		const loadNativeToken = async () => {
			const { nativeTokenSymbol } = await network();
			setFromToken(nativeTokens[nativeTokenSymbol as keyof NativeTokens]);
		};

		async function getGweiPrice() {
			const ethPrice = await getEthLastPrice();
			gweiPrice.set(+ethPrice.result.ethusd / 1000000000);
		}

		async function fetchWalletTokens() {
			const address = wallet.address.value || '';
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
			setOwnedTokens(tokens.map(({ symbol }) => symbol.toLowerCase()));
		}
		exchange.set({} as ExchangeState);
		loadNativeToken();
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

	const exchangeSummary = () => {
		if (fromToken && toToken) {
			if (quote) {
				const destQuantity = quote.to[toToken.symbol];

				return `1 ${fromToken.symbol} = ${utils
					.formatUnits(destQuantity, toToken.decimals)
					.match(/^-?\d+(?:\.\d{0,9})?/)} ${toToken.symbol}`;
			}
			return <ActivityIndicator color={colors.primary} size={16} />;
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
					<View style={[globalStyles.row, styles.exchangeHeadlineRow]}>
						<Headline style={globalStyles.headline}>Exchange</Headline>
						<Text style={styles.exchangeSummaryText}>{exchangeSummary()}</Text>
					</View>
					<Card style={styles.tokenCard}>
						<TokenCard
							token={fromToken}
							onPress={showModalFrom}
							balance={fromTokenBalance}
							innerRef={fromAmountRef}
							updateQuotes={updateFromQuotes}
							conversionAmount={fromConversionAmount}
						/>

						<TouchableOpacity style={styles.tokenCardDivisor} onPress={directionSwap}>
							<View style={styles.tokenCardDivisorBackground}>
								<Svg
									width={24}
									height={23}
									viewBox="0 0 24 24"
									fill={canChangeDirections ? colors.primary : colors.disabled}
								>
									<Path
										fill-rule="evenodd"
										clip-rule="evenodd"
										// eslint-disable-next-line max-len
										d="M10.9822 19.6603C11.4723 20.1604 12.2776 20.1604 12.7678 19.6603L17.2858 15.0501C17.6723 14.6556 18.3055 14.6492 18.6999 15.0358C19.0944 15.4224 19.1008 16.0555 18.7142 16.4499L14.1962 21.0602C12.9219 22.3605 10.8281 22.3605 9.55381 21.0602L5.03579 16.4499C4.64922 16.0555 4.65562 15.4224 5.05007 15.0358C5.44452 14.6492 6.07765 14.6556 6.46421 15.0501L10.9822 19.6603Z"
										fill={canChangeDirections ? colors.primary : colors.disabled}
									/>
									<Path
										fill-rule="evenodd"
										clip-rule="evenodd"
										// eslint-disable-next-line max-len
										d="M11.875 22C11.3227 22 10.875 21.5523 10.875 21L10.875 8.5C10.875 7.94771 11.3227 7.5 11.875 7.5C12.4273 7.5 12.875 7.94771 12.875 8.5L12.875 21C12.875 21.5523 12.4273 22 11.875 22ZM11.875 5.875C11.3227 5.875 10.875 5.42728 10.875 4.875L10.875 3.125C10.875 2.57271 11.3227 2.125 11.875 2.125C12.4273 2.125 12.875 2.57271 12.875 3.125L12.875 4.875C12.875 5.42728 12.4273 5.875 11.875 5.875Z"
										fill={canChangeDirections ? colors.primary : colors.disabled}
									/>
								</Svg>
							</View>
						</TouchableOpacity>

						<TokenCard
							token={toToken}
							onPress={showModalTo}
							balance={toTokenBalance}
							innerRef={toAmountRef}
							updateQuotes={updateToQuotes}
							conversionAmount={toConversionAmount}
							disableMax
						/>
					</Card>
				</View>

				{false && <GasSelector gasPrice={gasPrice.value} gweiPrice={gweiPrice.value} />}

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
