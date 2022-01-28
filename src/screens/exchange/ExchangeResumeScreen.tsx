import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Card, Headline, Text, Portal, Modal, Button, IconButton, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import ProgressButton from '@components/ProgressButton';
import { Svg, Path } from 'react-native-svg';
import { globalExchangeState } from '@stores/ExchangeStore';
import { ParaswapToken, ExchangeRoute, getExchangePrice, createTransaction } from '@models/token';
import { smallWalletAddress, provider } from '@models/wallet';
import { toBn } from 'evm-bn';
import { BigNumber, utils } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { globalWalletState } from '@stores/WalletStore';
import * as Linking from 'expo-linking';
import GasOption from './GasOption';
import { makeStyles } from './styles';

const TokenDetail = ({
	token,
	amount,
	usdAmount
}: {
	token: ParaswapToken;
	amount: string | undefined;
	usdAmount: string | undefined;
}) => (
	<View style={{ padding: 16 }}>
		<Image source={{ uri: token.img }} style={{ width: 40, height: 40, marginBottom: 16 }} />
		<Text style={{ fontWeight: 'bold' }}>${usdAmount}</Text>
		<Text>
			{amount} {token.symbol}
		</Text>
	</View>
);

const ExchangeResumeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const exchange = globalExchangeState();
	const wallet = globalWalletState();
	const { to, from, fromAmount, toAmount } = exchange.value;
	const [priceQuote, setPriceQuote] = useState<ExchangeRoute>();
	const [visible, setVisible] = useState(false);
	const [transactionHash, setTransactionHash] = useState(
		'0x94f47857de4edbdbc18d5c788856795533b2fe6c21b966166fae143c7688f193'
	);

	const showModal = () => setVisible(true);
	const hideModal = () => {
		exchange.fromAmount.set(undefined);
		exchange.toAmount.set(undefined);
		exchange.gas.set(undefined);
		setVisible(false);
		navigation.navigate('Wallet');
	};
	const containerStyle = { backgroundColor: 'white', padding: 20 };
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	useEffect(() => {
		const loadPrices = async () => {
			const result = await getExchangePrice(from.symbol, to.symbol, toBn(fromAmount || '').toString());
			if (result.error) {
				console.error(result.error);
			} else {
				setPriceQuote(result);
			}
		};

		loadPrices();
	}, []);

	const formatAmount = (amount: string | undefined, decimals: number | undefined): string | null => {
		if (amount) {
			return utils.formatUnits(BigNumber.from(amount), decimals);
		}

		return null;
	};

	const exchangeSummary = () => {
		let src = fromAmount || 1;
		let dest = toAmount || 1;
		if (priceQuote) {
			const { srcAmount, destAmount, srcDecimals, destDecimals } = priceQuote.priceRoute;
			src = formatUnits(srcAmount, srcDecimals);
			dest = formatUnits(destAmount, destDecimals);
		}

		if (fromAmount && toAmount) {
			return `${+dest / +src} ${to.symbol} per ${from.symbol}`;
		}

		return null;
	};

	const exchangeName = priceQuote?.priceRoute.bestRoute[0].swaps[0].swapExchanges[0].exchange;
	const onFinish = async () => {
		if (priceQuote?.priceRoute) {
			const { srcToken, srcDecimals, destToken, destDecimals, srcAmount, destAmount } = priceQuote.priceRoute;
			const result = await createTransaction({
				srcToken,
				srcDecimals,
				destToken,
				destDecimals,
				srcAmount,
				destAmount,
				priceRoute: priceQuote.priceRoute,
				userAddress: wallet.value.wallet?.address || ''
			});

			if (result.error) {
				console.error(result.error);
			} else if (wallet.value.wallet && exchange.value.gas) {
				const { chainId, data, from: src, gas, gasPrice, to: dest, value } = result;
				const nonce = await provider.getTransactionCount(wallet.value.wallet.address, 'latest');
				const txDefaults = {
					chainId,
					data,
					from: src,
					gasPrice: BigNumber.from(gasPrice),
					gasLimit: +gas,
					nonce,
					to: dest,
					value: BigNumber.from(value)
				};
				const signedTx = await wallet.value.wallet.signTransaction({ ...txDefaults });
				const { hash } = await provider.sendTransaction(signedTx as string);
				setTransactionHash(hash);
				showModal();
			}
		}
	};

	return (
		<Container style={styles.exchangeContainer}>
			<View style={styles.exchangeResumeContainer}>
				<Headline style={styles.pageTitle}>Exchange Resume</Headline>

				<View style={styles.exchangeResumeCard}>
					<View style={styles.exchangeResume}>
						<TokenDetail
							token={from}
							amount={
								formatAmount(priceQuote?.priceRoute.srcAmount, priceQuote?.priceRoute.srcDecimals) ||
								fromAmount
							}
							usdAmount={priceQuote?.priceRoute.srcUSD}
						/>

						<View style={styles.exchangeResumeDivisor}>
							<View style={styles.exchangeResumeBackground}>
								<Svg width="24" height="24" viewBox="0 0 24 24" fill={colors.primary}>
									<Path
										fill-rule="evenodd"
										clip-rule="evenodd"
										// eslint-disable-next-line max-len
										d="M19.6601 13.0178C20.1602 12.5277 20.1602 11.7224 19.6601 11.2322L15.0498 6.71421C14.6554 6.32765 14.649 5.69452 15.0356 5.30007C15.4221 4.90562 16.0552 4.89923 16.4497 5.28579L21.0599 9.80381C22.3602 11.0781 22.3602 13.1719 21.0599 14.4462L16.4497 18.9642C16.0552 19.3508 15.4221 19.3444 15.0356 18.9499C14.649 18.5555 14.6554 17.9224 15.0498 17.5358L19.6601 13.0178Z"
										fill={colors.primary}
									/>
									<Path
										fill-rule="evenodd"
										clip-rule="evenodd"
										// eslint-disable-next-line max-len
										d="M22 12.125C22 12.6773 21.5523 13.125 21 13.125L8.5 13.125C7.94771 13.125 7.5 12.6773 7.5 12.125C7.5 11.5727 7.94771 11.125 8.5 11.125L21 11.125C21.5523 11.125 22 11.5727 22 12.125ZM5.875 12.125C5.875 12.6773 5.42728 13.125 4.875 13.125L3.125 13.125C2.57271 13.125 2.125 12.6773 2.125 12.125C2.125 11.5727 2.57271 11.125 3.125 11.125L4.875 11.125C5.42728 11.125 5.875 11.5727 5.875 12.125Z"
										fill={colors.primary}
									/>
								</Svg>
							</View>
						</View>

						<TokenDetail
							token={to}
							amount={
								formatAmount(priceQuote?.priceRoute.destAmount, priceQuote?.priceRoute.destDecimals) ||
								toAmount
							}
							usdAmount={priceQuote?.priceRoute.destUSD}
						/>
					</View>
					<View style={styles.ExchangeResumeRateFixedContiner}>
						<View style={styles.ExchangeResumeRateFixedLabel}>
							<Text>Rate fixed for: </Text>
						</View>
						<View style={styles.ExchangeResumeRateFixed}>
							<Text>1:95</Text>
						</View>
					</View>
				</View>
			</View>

			<Card style={styles.summaryCard}>
				<Card.Content>
					<View style={styles.summaryRow}>
						<Text>Maximum sold</Text>
						<Text style={styles.textBold}>
							{formatAmount(priceQuote?.priceRoute.srcAmount, priceQuote?.priceRoute.srcDecimals) ||
								fromAmount}{' '}
							{from.symbol}
						</Text>
					</View>

					<View style={styles.summaryRow}>
						<Text>Rate</Text>
						<Text style={styles.textBold}>{exchangeSummary()}</Text>
					</View>

					<View style={styles.summaryRow}>
						<Text>{to.symbol} contract</Text>
						<Text style={styles.textBold}>{smallWalletAddress(to.address)}</Text>
					</View>

					<View style={styles.summaryRow}>
						<Text>Swapping via</Text>
						<Text style={styles.textBold}>{exchangeName}</Text>
					</View>
				</Card.Content>
			</Card>

			{exchange.value.gas ? (
				<GasOption
					type={exchange.value.gas.type}
					gweiPrice={exchange.value.gas.gweiPrice}
					gweiValue={exchange.value.gas.gweiValue}
					wait={exchange.value.gas.wait}
				/>
			) : null}
			{priceQuote ? <ProgressButton onFinish={onFinish} /> : null}
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
					<IconButton icon="close" size={24} color="#006AA6" onPress={hideModal} />
					<Image source={{ uri: exchange.value.from.img }} style={{ width: 50, height: 50 }} />
					<Image source={{ uri: exchange.value.to.img }} style={{ width: 50, height: 50 }} />
					<Headline>Processing Transaction</Headline>
					<Text>
						Exchanging {exchange.value.from.symbol} for {exchange.value.to.symbol}
					</Text>
					<Text>Transaction</Text>
					<Button
						mode="text"
						onPress={() => Linking.openURL(`https://ropsten.etherscan.io/tx/${transactionHash}`)}
					>
						{smallWalletAddress(transactionHash)}
					</Button>
				</Modal>
			</Portal>
		</Container>
	);
};

export default ExchangeResumeScreen;
