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
	<View style={{ width: '50%', padding: 16 }}>
		<Image source={{ uri: token.img }} style={{ width: 40, height: 40 }} />
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
				<Card style={styles.exchangeResumeCard}>
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
								<Svg
									width={24}
									height={23}
									viewBox="0 0 24 24"
									fill={colors.primary}
									transform={{ rotation: -90, originX: 13, originY: 13 }}
								>
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
					</View>
				</Card>
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
