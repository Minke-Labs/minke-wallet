import React, { useCallback, useEffect } from 'react';
import { Image, View, SafeAreaView, ScrollView } from 'react-native';
import { Card, Headline, Text, Portal, useTheme, ActivityIndicator } from 'react-native-paper';
import { useState } from '@hookstate/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import ProgressButton from '@components/ProgressButton';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import { Svg, Path } from 'react-native-svg';
import { Gas, globalExchangeState } from '@stores/ExchangeStore';
import { ParaswapToken, ExchangeRoute, getExchangePrice, createTransaction } from '@models/token';
import { approveSpending } from '@models/contract';
import { getProvider, smallWalletAddress } from '@models/wallet';
import { Wallet, BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { globalWalletState } from '@stores/WalletStore';
import globalStyles from '@src/components/global.styles';
import GasOption from '../GasOption';
import { makeStyles } from './styles';

const TokenDetail = ({ token, amount, usdAmount }: { token: ParaswapToken; amount: string; usdAmount: string }) => (
	<View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', padding: 16 }}>
		<View style={{ borderRadius: 50, borderWidth: 2, borderColor: 'rgba(98, 126, 234, 0.2)', marginRight: 8 }}>
			<Image source={{ uri: token.img }} style={{ width: 40, height: 40 }} />
		</View>
		<View>
			<Text style={{ fontWeight: 'bold' }}>${usdAmount.match(/^-?\d+(?:\.\d{0,4})?/)}</Text>
			<Text>
				{token.symbol} {amount}
			</Text>
		</View>
	</View>
);

const ExchangeResumeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const exchange = useState(globalExchangeState());
	const wallet = useState(globalWalletState());
	const { to, from, fromAmount, toAmount, lastConversion, gas = {} as Gas } = exchange.value;
	const [priceQuote, setPriceQuote] = React.useState<ExchangeRoute>();
	const [loading, setLoading] = React.useState(false); // creating transaction
	const [visible, setVisible] = React.useState(false);
	const [count, setCount] = React.useState(45);
	const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();
	const [transactionHash, setTransactionHash] = React.useState('');
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const showModal = () => setVisible(true);
	const hideModal = () => {
		exchange.fromAmount.set(undefined);
		exchange.toAmount.set(undefined);
		exchange.gas.set(undefined);
		setVisible(false);
		navigation.navigate('Wallet');
	};

	const startCounter = useCallback(() => {
		setCount(45);
		setIntervalId(setInterval(() => setCount((c) => c - 1), 1000));
	}, []);

	const resetInterval = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};

	const loadPrices = async () => {
		if (!loading) {
			const { address: srcToken, decimals: srcDecimals } = from;
			const { address: destToken, decimals: destDecimals } = to;
			const { direction = 'from' } = lastConversion || {};
			const result = await getExchangePrice({
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				amount: (direction === 'to' ? toAmount : fromAmount) || '',
				side: direction === 'to' ? 'BUY' : 'SELL'
			});

			if (result.error) {
				console.error(result.error);
			} else {
				setPriceQuote(result);
			}
		}
	};

	useEffect(() => {
		resetInterval();
		loadPrices();
		startCounter();
	}, []);

	useEffect(() => {
		if (count === 0) {
			loadPrices();
		}
	}, [count]);

	useEffect(() => {
		setCount(45);
	}, [priceQuote]);

	const exchangeSummary = () => {
		let src = fromAmount || 1;
		let dest = toAmount || 1;
		if (priceQuote) {
			const { srcAmount, destAmount, srcDecimals, destDecimals } = priceQuote.priceRoute;
			src = formatUnits(srcAmount, srcDecimals);
			dest = formatUnits(destAmount, destDecimals);
		}

		if (fromAmount && toAmount) {
			return `${(+dest / +src).toString().match(/^-?\d+(?:\.\d{0,9})?/)} ${to.symbol} per ${from.symbol}`;
		}

		return null;
	};

	const exchangeName = priceQuote?.priceRoute.bestRoute[0].swaps[0].swapExchanges[0].exchange;
	const onFinish = async () => {
		if (priceQuote?.priceRoute) {
			setLoading(true);
			const { priceRoute } = priceQuote;
			const {
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				srcAmount,
				destAmount,
				tokenTransferProxy: spender,
				side
			} = priceRoute;

			const { permit, approvalTransaction } = await approveSpending({
				userAddress: wallet.address.value,
				amount: srcAmount,
				privateKey: wallet.privateKey.value,
				contractAddress: srcToken,
				spender
			});
			if (approvalTransaction) {
				await approvalTransaction.wait();
			}

			const { gweiValue } = exchange.gas.value || {};
			const result = await createTransaction({
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				srcAmount,
				destAmount,
				priceRoute,
				userAddress: wallet.value.address || '',
				permit,
				gasPrice: gweiValue ? +gweiValue * 1000000000 : undefined,
				side
			});

			if (result.error) {
				setLoading(false);
				console.error(result.error);
			} else if (wallet.value && gas) {
				const provider = await getProvider();
				const { chainId, data, from: src, gas: gasLimit, gasPrice, to: dest, value } = result;
				const nonce = await provider.getTransactionCount(wallet.value.address, 'latest');
				const txDefaults = {
					chainId,
					data,
					from: src,
					gasPrice: BigNumber.from(gasPrice),
					gasLimit: +gasLimit,
					nonce,
					to: dest,
					value: BigNumber.from(value)
				};
				const walletObject = new Wallet(wallet.privateKey.value, provider);
				const signedTx = await walletObject.signTransaction(txDefaults);
				const { hash } = await provider.sendTransaction(signedTx as string);
				setTransactionHash(hash);
				showModal();
			}
		}
	};

	return (
		<Container style={styles.exchangeContainer}>
			<SafeAreaView>
				<ScrollView>
					<View style={styles.exchangeResumeContainer}>
						<Headline style={globalStyles.headline}>Exchange Resume</Headline>

						<Card style={styles.tokenCard}>
							{priceQuote ? (
								<TokenDetail
									token={from}
									amount={formatUnits(
										priceQuote.priceRoute.srcAmount,
										priceQuote.priceRoute.srcDecimals
									)}
									usdAmount={priceQuote?.priceRoute.srcUSD}
								/>
							) : (
								<ActivityIndicator size={24} color={colors.primary} />
							)}

							<View style={styles.tokenCardDivisor}>
								<View style={styles.tokenCardDivisorBackground}>
									<Svg width={24} height={23} viewBox="0 0 24 24" fill={colors.primary}>
										<Path
											fill-rule="evenodd"
											clip-rule="evenodd"
											// eslint-disable-next-line max-len
											d="M10.9822 19.6603C11.4723 20.1604 12.2776 20.1604 12.7678 19.6603L17.2858 15.0501C17.6723 14.6556 18.3055 14.6492 18.6999 15.0358C19.0944 15.4224 19.1008 16.0555 18.7142 16.4499L14.1962 21.0602C12.9219 22.3605 10.8281 22.3605 9.55381 21.0602L5.03579 16.4499C4.64922 16.0555 4.65562 15.4224 5.05007 15.0358C5.44452 14.6492 6.07765 14.6556 6.46421 15.0501L10.9822 19.6603Z"
											fill={colors.primary}
										/>
										<Path
											fill-rule="evenodd"
											clip-rule="evenodd"
											// eslint-disable-next-line max-len
											d="M11.875 22C11.3227 22 10.875 21.5523 10.875 21L10.875 8.5C10.875 7.94771 11.3227 7.5 11.875 7.5C12.4273 7.5 12.875 7.94771 12.875 8.5L12.875 21C12.875 21.5523 12.4273 22 11.875 22ZM11.875 5.875C11.3227 5.875 10.875 5.42728 10.875 4.875L10.875 3.125C10.875 2.57271 11.3227 2.125 11.875 2.125C12.4273 2.125 12.875 2.57271 12.875 3.125L12.875 4.875C12.875 5.42728 12.4273 5.875 11.875 5.875Z"
											fill={colors.primary}
										/>
									</Svg>
								</View>
							</View>

							{priceQuote ? (
								<TokenDetail
									token={to}
									amount={formatUnits(
										priceQuote.priceRoute.destAmount,
										priceQuote.priceRoute.destDecimals
									)}
									usdAmount={priceQuote?.priceRoute.destUSD}
								/>
							) : (
								<ActivityIndicator size={24} color={colors.primary} />
							)}

							{!loading && (
								<View style={styles.exchangeResumeRateFixedContiner}>
									<View style={styles.exchangeResumeRateFixedLabel}>
										<Text>Rate fixed for: </Text>
									</View>
									<View style={styles.exchangeResumeRateFixed}>
										<View style={[styles.exchangeProgressBar, { width: count * 1.42222222 }]} />
										<View style={styles.timerContainer}>
											{count >= 0 && (
												<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
													0:{count < 10 ? `0${count}` : count}
												</Text>
											)}
										</View>
									</View>
								</View>
							)}
						</Card>
					</View>

					<Card style={styles.summaryCard}>
						<Card.Content>
							<View style={(styles.summaryRow, styles.marginBottom)}>
								<Text>Maximum sold</Text>
								{priceQuote ? (
									<Text style={globalStyles.fontBold}>
										{formatUnits(
											priceQuote.priceRoute.srcAmount,
											priceQuote.priceRoute.srcDecimals
										).match(/^-?\d+(?:\.\d{0,9})?/)}{' '}
										{from.symbol}
									</Text>
								) : (
									<ActivityIndicator size={24} color={colors.primary} />
								)}
							</View>

							<View style={(styles.summaryRow, styles.marginBottom)}>
								<Text>Rate</Text>
								<Text style={globalStyles.fontBold}>{exchangeSummary()}</Text>
							</View>

							<View style={(styles.summaryRow, styles.marginBottom)}>
								<Text>{to.symbol} contract</Text>
								<Text style={globalStyles.fontBold}>{smallWalletAddress(to.address)}</Text>
							</View>

							<View style={styles.summaryRow}>
								<Text>Swapping via</Text>
								<Text style={globalStyles.fontBold}>{exchangeName}</Text>
							</View>
						</Card.Content>
					</Card>

					{exchange.value.gas && <GasOption type={gas.type} disabled />}

					{priceQuote &&
						(loading ? (
							<ActivityIndicator color={colors.primary} />
						) : (
							<ProgressButton onFinish={onFinish} />
						))}
					<Portal>
						<TransactionWaitModal
							visible={visible}
							fromToken={from}
							toToken={to}
							onDismiss={hideModal}
							transactionHash={transactionHash}
						/>
					</Portal>
				</ScrollView>
			</SafeAreaView>
		</Container>
	);
};

export default ExchangeResumeScreen;
