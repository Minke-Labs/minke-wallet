import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Card, Headline, Text, Portal, Button, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import ProgressButton from '@components/ProgressButton';
import Modal from '@components/Modal';
import { Svg, Path } from 'react-native-svg';
import { globalExchangeState } from '@stores/ExchangeStore';
import { ParaswapToken, ExchangeRoute, getExchangePrice, createTransaction } from '@models/token';
import { getProvider, smallWalletAddress } from '@models/wallet';
import { toBn } from 'evm-bn';
import { Wallet, BigNumber, utils } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { globalWalletState } from '@stores/WalletStore';
import * as Linking from 'expo-linking';
import globalStyles from '@src/components/global.styles';
import GasOption from '../GasOption';
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
	<View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', padding: 16 }}>
		<View style={{ borderRadius: 50, borderWidth: 2, borderColor: 'rgba(98, 126, 234, 0.2)', marginRight: 8 }}>
			<Image source={{ uri: token.img }} style={{ width: 40, height: 40 }} />
		</View>
		<View>
			<Text style={{ fontWeight: 'bold' }}>${usdAmount}</Text>
			<Text>
				{token.symbol} {amount}
			</Text>
		</View>
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
				userAddress: wallet.value.address || ''
			});

			if (result.error) {
				console.error(result.error);
			} else if (wallet.value && exchange.value.gas) {
				const provider = await getProvider();
				const { chainId, data, from: src, gas, gasPrice, to: dest, value } = result;
				const nonce = await provider.getTransactionCount(wallet.value.address, 'latest');
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
				const walletObject = new Wallet(wallet.privateKey.value, provider);
				const signedTx = await walletObject.signTransaction({ ...txDefaults });
				const { hash } = await provider.sendTransaction(signedTx as string);
				setTransactionHash(hash);
				showModal();
			}
		}
	};

	return (
		<Container style={styles.exchangeContainer}>
			<View style={styles.exchangeResumeContainer}>
				<Headline style={globalStyles.headline}>Exchange Resume</Headline>

				<Card style={styles.tokenCard}>
					<TokenDetail
						token={from}
						amount={
							formatAmount(priceQuote?.priceRoute.srcAmount, priceQuote?.priceRoute.srcDecimals) ||
							fromAmount
						}
						usdAmount={priceQuote?.priceRoute.srcUSD}
					/>

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

					<TokenDetail
						token={to}
						amount={
							formatAmount(priceQuote?.priceRoute.destAmount, priceQuote?.priceRoute.destDecimals) ||
							toAmount
						}
						usdAmount={priceQuote?.priceRoute.destUSD}
					/>

					<View style={styles.exchangeResumeRateFixedContiner}>
						<View style={styles.exchangeResumeRateFixedLabel}>
							<Text>Rate fixed for: </Text>
						</View>
						<View style={styles.exchangeResumeRateFixed}>
							<Text>1:95</Text>
						</View>
					</View>
				</Card>
			</View>

			<Card style={styles.summaryCard}>
				<Card.Content>
					<View style={(styles.summaryRow, styles.marginBottom)}>
						<Text>Maximum sold</Text>
						<Text style={globalStyles.fontBold}>
							{formatAmount(priceQuote?.priceRoute.srcAmount, priceQuote?.priceRoute.srcDecimals) ||
								fromAmount}{' '}
							{from.symbol}
						</Text>
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
				<Modal visible={visible} onDismiss={hideModal}>
					<View style={styles.modalRow}>
						<Image
							source={{ uri: exchange.value.from.img }}
							style={{ width: 50, height: 50, marginRight: 56 }}
						/>
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
						<Image source={{ uri: exchange.value.to.img }} style={{ width: 50, height: 50 }} />
					</View>
					<View style={styles.modalColumn}>
						<Headline style={globalStyles.headline}>Processing Transaction</Headline>
					</View>
					<View style={styles.modalRow}>
						<Text>Exchanging </Text>
						<Text style={globalStyles.fontBold}> {exchange.value.from.symbol}</Text>
						<Text> for </Text>
						<Text style={globalStyles.fontBold}> {exchange.value.to.symbol}</Text>
					</View>
					<View style={styles.modalRow}>
						<Text>Transaction:</Text>
						<Button
							mode="text"
							onPress={() => Linking.openURL(`https://ropsten.etherscan.io/tx/${transactionHash}`)}
						>
							{smallWalletAddress(transactionHash)}
						</Button>
					</View>
				</Modal>
			</Portal>
		</Container>
	);
};

export default ExchangeResumeScreen;
