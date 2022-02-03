import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Card, Headline, Text, Portal, Modal, Button, IconButton } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'old/src/helpers/param-list-type';
import Container from 'old/src/components/Container';
import ProgressButton from 'old/src/components/ProgressButton';
import { globalExchangeState } from 'old/src/stores/ExchangeStore';
import { ParaswapToken, ExchangeRoute, getExchangePrice, createTransaction } from '@src/model/token';
import { getProvider, smallWalletAddress } from '@src/model/wallet';
import { toBn } from 'evm-bn';
import { Wallet, BigNumber, utils } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { globalWalletState } from 'old/src/stores/WalletStore';
import * as Linking from 'expo-linking';
import GasOption from './GasOption';

const TokenDetail = ({
	token,
	amount,
	usdAmount
}: {
	token: ParaswapToken;
	amount: string | undefined;
	usdAmount: string | undefined;
}) => (
	<Card style={{ borderRadius: 16 }}>
		<Card.Content>
			<Image source={{ uri: token.img }} style={{ width: 50, height: 50 }} />
			<Text>${usdAmount}</Text>
			<Text>
				{amount} {token.symbol}
			</Text>
		</Card.Content>
	</Card>
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
		<Container>
			<Headline>Exchange Resume</Headline>
			<View style={{ padding: 20 }}>
				<TokenDetail
					token={from}
					amount={
						formatAmount(priceQuote?.priceRoute.srcAmount, priceQuote?.priceRoute.srcDecimals) || fromAmount
					}
					usdAmount={priceQuote?.priceRoute.srcUSD}
				/>
				<TokenDetail
					token={to}
					amount={
						formatAmount(priceQuote?.priceRoute.destAmount, priceQuote?.priceRoute.destDecimals) || toAmount
					}
					usdAmount={priceQuote?.priceRoute.destUSD}
				/>
			</View>
			<Card style={{ marginTop: 20 }}>
				<Card.Content>
					<Text>Maximum sold</Text>
					<Text>
						{formatAmount(priceQuote?.priceRoute.srcAmount, priceQuote?.priceRoute.srcDecimals) ||
							fromAmount}{' '}
						{from.symbol}
					</Text>
					<Text>Rate</Text>
					<Text>{exchangeSummary()}</Text>
					<Text>{to.symbol} contract</Text>
					<Text>{smallWalletAddress(to.address)}</Text>
					<Text>Swapping via</Text>
					<Text>{exchangeName}</Text>
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
