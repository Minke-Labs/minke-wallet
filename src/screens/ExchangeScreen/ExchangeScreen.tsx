/* eslint-disable no-useless-escape */
import React, { useEffect, createRef, useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useTheme } from '@hooks';
import { useState, State } from '@hookstate/core';
import { BigNumber, utils } from 'ethers';
import { BigNumber as BN } from 'bignumber.js';
import { fromBn } from 'evm-bn';
import { getWalletTokens, WalletToken } from '@models/wallet';
import { ParaswapToken, Quote, getExchangePrice, nativeTokens, NativeTokens, ExchangeParams } from '@models/token';
import { network } from '@models/network';
import { debounce } from 'lodash';
import { globalWalletState } from '@stores/WalletStore';
import { ExchangeState, Conversion, globalExchangeState } from '@stores/ExchangeStore';
import { WelcomeLayout } from '@layouts';
import { Text, Button, Icon, Modal, ActivityIndicator } from '@components';
import { tokenBalanceFormat } from '@helpers/utilities';
import { RootStackParamList } from '../../routes/types.routes';
import SearchTokens from './SearchTokens';
import GasSelector from './GasSelector';
import TokenCard from './TokenCard';
import { makeStyles } from './ExchangeScreen.styles';
import Warning from './Warning/Warning';

const ExchangeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const wallet = useState(globalWalletState());
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [nativeToken, setNativeToken] = React.useState<ParaswapToken>();
	const [fromToken, setFromToken] = React.useState<ParaswapToken>({} as ParaswapToken);
	const [toToken, setToToken] = React.useState<ParaswapToken>();
	const [loadingPrices, setLoadingPrices] = React.useState(false);
	const [fromTokenBalance, setFromTokenBalance] = React.useState('0');
	const [toTokenBalance, setToTokenBalance] = React.useState('0');
	const [searchSource, setSearchSource] = React.useState<'from' | 'to'>('from');
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>();
	const [ownedTokens, setOwnedTokens] = React.useState<Array<string>>();
	const [showOnlyOwnedTokens, setShowOnlyOwnedTokens] = React.useState(true);
	const [quote, setQuote] = React.useState<Quote | null>();
	const [fromConversionAmount, setFromConversionAmount] = React.useState<string | undefined>();
	const [toConversionAmount, setToConversionAmount] = React.useState<string | undefined>();
	const [lastConversion, setLastConversion] = React.useState<Conversion>();
	const fromAmountRef = createRef<TextInput>();
	const toAmountRef = createRef<TextInput>();

	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const balanceFrom = useCallback(
		(token: ParaswapToken | undefined): number => {
			if (!token) {
				return 0;
			}
			const walletToken = walletTokens?.find(
				(owned) => owned.symbol.toLowerCase() === token.symbol.toLowerCase()
			);
			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken) {
				const { gweiValue } = exchange.gas.value || {};
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return Math.max(walletToken.balance - gasPrice, 0);
			}
			return walletToken?.balance || 0;
		},
		[exchange.gas.value, walletTokens, nativeToken]
	);

	const updateFromToken = (token: ParaswapToken) => {
		setFromToken(token);
		setFromTokenBalance(balanceFrom(token).toString());
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

	interface PriceParams {
		amount?: string;
		side?: ExchangeParams['side'];
	}

	const loadPrices = async ({ amount = '1', side = 'SELL' }: PriceParams): Promise<Quote | undefined> => {
		if (fromToken && toToken) {
			setLoadingPrices(true);
			const { address: srcToken, decimals: srcDecimals } = fromToken;
			const { address: destToken, decimals: destDecimals } = toToken;
			const {
				error,
				priceRoute: { srcAmount, destAmount }
			} = await getExchangePrice({ srcToken, srcDecimals, destToken, destDecimals, amount, side });
			if (error) {
				console.error(error); // ESTIMATED_LOSS_GREATER_THAN_MAX_IMPACT
				Keyboard.dismiss();
				setQuote(undefined);
				setLoadingPrices(false);
				return undefined;
			}

			const newQuote = {
				from: { [fromToken.symbol]: BigNumber.from(srcAmount) },
				to: { [toToken?.symbol || '']: BigNumber.from(destAmount) }
			};
			setQuote(newQuote);
			setLoadingPrices(false);
			return newQuote;
		}
		setLoadingPrices(false);
		return undefined;
	};

	const updateFromQuotes = async (amount: string) => {
		const formatedValue = amount.replace(/\,/g, '.');
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
			const newQuote = await loadPrices({ amount: formatedValue, side: 'SELL' });
			setQuote(newQuote);
			if (newQuote) {
				const converted = newQuote.to[toToken?.symbol || ''];
				const convertedAmount = utils.formatUnits(converted, toToken?.decimals);
				exchange.toAmount.set(convertedAmount);
				setToConversionAmount(convertedAmount);
				setFromConversionAmount(formatedValue);
			}
			setLastConversion({ direction: 'from', amount: formatedValue });
			exchange.fromAmount.set(formatedValue);
		}
	};

	const updateToQuotes = async (amount: string) => {
		const formatedValue = amount.replace(/\,/g, '.');
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
			const newQuote = await loadPrices({ amount: formatedValue, side: 'BUY' });
			setQuote(newQuote);
			if (newQuote) {
				setQuote(newQuote);
				const converted = newQuote.from[fromToken?.symbol || ''];
				const convertedAmount = utils.formatUnits(converted, fromToken.decimals);
				exchange.fromAmount.set(convertedAmount);
				setFromConversionAmount(convertedAmount);
				setToConversionAmount(formatedValue);
			}
			setLastConversion({ direction: 'to', amount: formatedValue });
			exchange.toAmount.set(formatedValue);
		}
	};

	const goToExchangeResume = () => {
		if (fromToken && toToken) {
			exchange.merge({ from: fromToken, to: toToken, lastConversion });
			navigation.navigate('ExchangeResumeScreen');
		}
	};

	const showModal = () => {
		Keyboard.dismiss();
		setSearchVisible(true);
	};
	const hideModal = () => {
		Keyboard.dismiss();
		setSearchVisible(false);
	};

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

	const onTokenSelect = (token: ParaswapToken) => {
		hideModal();
		setQuote(null);
		if (searchSource === 'from') {
			updateFromToken(token);
		} else {
			updateToToken(token);
		}
	};

	const canChangeDirections =
		!loadingPrices && fromToken && toToken && ownedTokens?.includes(toToken.symbol.toLowerCase());

	const directionSwap = () => {
		if (canChangeDirections) {
			if (lastConversion) {
				const { amount, direction } = lastConversion;
				setLastConversion({ amount, direction: direction === 'from' ? 'to' : 'from' });
			}
			exchange.merge({
				from: undefined,
				to: undefined,
				fromAmount: undefined,
				toAmount: undefined,
				lastConversion: undefined
			});
			const backup = fromToken;
			updateFromToken(toToken || ({} as ParaswapToken));
			updateToToken(backup);
		}
	};

	const ExchangeSummary = useCallback(() => {
		if (fromToken && toToken) {
			if (quote) {
				const destQuantity = new BN(fromBn(quote.to[toToken.symbol], toToken.decimals));
				const sourceQuantity = new BN(fromBn(quote.from[fromToken.symbol], fromToken.decimals));
				const division = destQuantity.dividedBy(sourceQuantity).toPrecision(toToken.decimals);
				const destQuantityString = tokenBalanceFormat(division, 9);
				return (
					<Text type="span" weight="regular" color="text3">
						1 {fromToken.symbol} = {destQuantityString} {toToken.symbol}
					</Text>
				);
			}
			return (
				<>
					<Text type="span" weight="regular" color="text3">
						Fetching...
					</Text>
					<ActivityIndicator size={16} />
				</>
			);
		}
		return null;
	}, [quote]);

	useEffect(() => {
		const loadNativeToken = async () => {
			const {
				nativeToken: { symbol: nativeTokenSymbol }
			} = await network();
			const native = nativeTokens[nativeTokenSymbol as keyof NativeTokens];
			setFromToken(native);
			setNativeToken(native);
		};

		const fetchWalletTokens = async () => {
			const address = wallet.address.value || '';
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
			setOwnedTokens(tokens.map(({ symbol }) => symbol.toLowerCase()));
		};
		exchange.set({} as ExchangeState);
		loadNativeToken();
		fetchWalletTokens();
	}, []);

	useEffect(() => {
		setFromTokenBalance(balanceFrom(fromToken).toString());
		setToTokenBalance(balanceFrom(toToken).toString());
	}, [ownedTokens, exchange.gas.value]);

	useEffect(() => {
		if (fromToken && toToken) {
			if (lastConversion) {
				const { direction, amount } = lastConversion;
				if (direction === 'from') {
					updateFromQuotes(amount);
				} else {
					updateToQuotes(amount);
				}
			} else {
				loadPrices({});
			}
		}
	}, [toToken, fromToken]);

	const enoughForGas = nativeToken && balanceFrom(nativeToken) > 0;

	const canSwap = () =>
		quote &&
		fromToken &&
		toToken &&
		exchange.value.fromAmount &&
		exchange.value.toAmount &&
		+(exchange.value.fromAmount || 0) > 0 &&
		balanceFrom(fromToken) >= +(exchange.value.fromAmount || 0) &&
		!loadingPrices &&
		enoughForGas;

	// this view is needed to hide the keyboard if you press outside the inputs
	return (
		<>
			<WelcomeLayout>
				<View style={styles.header}>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" color="text7" size={24} />
					</TouchableOpacity>
				</View>
				<View style={styles.exchangeSection}>
					<View style={styles.exchangeHeadlineRow}>
						<Text type="h3" weight="extraBold">
							Exchange
						</Text>
						<ExchangeSummary />
					</View>
					<Card style={styles.tokenCard}>
						<TokenCard
							token={fromToken}
							onPress={showModalFrom}
							balance={fromTokenBalance}
							innerRef={fromAmountRef}
							updateQuotes={debounce(updateFromQuotes, 500)}
							conversionAmount={fromConversionAmount}
						/>

						<TouchableOpacity
							style={styles.tokenCardDivisor}
							onPress={directionSwap}
							disabled={!canChangeDirections}
						>
							<View style={styles.tokenCardDivisorBackground}>
								{loadingPrices ? (
									<ActivityIndicator />
								) : (
									<Icon name="arrowDown" size={24} color={canChangeDirections ? 'cta1' : 'cta2'} />
								)}
							</View>
						</TouchableOpacity>

						<TokenCard
							token={toToken}
							onPress={showModalTo}
							balance={toTokenBalance}
							innerRef={toAmountRef}
							updateQuotes={debounce(updateToQuotes, 500)}
							conversionAmount={toConversionAmount}
							disableMax
						/>
					</Card>
				</View>

				<GasSelector />

				<View style={[styles.exchangeSection, styles.exchangeButton]}>
					{!loadingPrices && !enoughForGas && <Warning label="Not enough balance for gas" />}

					{loadingPrices ? (
						<ActivityIndicator />
					) : (
						<Button title="Exchange" onPress={goToExchangeResume} disabled={!canSwap()} />
					)}
				</View>
			</WelcomeLayout>
			<Modal isVisible={searchVisible} onDismiss={hideModal}>
				<SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={ownedTokens}
					showOnlyOwnedTokens={showOnlyOwnedTokens}
					selected={[fromToken?.symbol?.toLowerCase(), toToken?.symbol?.toLowerCase()]}
				/>
			</Modal>
		</>
	);
};

export default ExchangeScreen;
