import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { globalExchangeState } from '@stores/ExchangeStore';
import { Card, Headline, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import { ParaswapToken, ExchangeRoute, getExchangePrice } from '@models/token';
import { toBn } from 'evm-bn';
import { BigNumber, utils } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

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

const ExchangeResumeScreen = () => {
	const exchange = globalExchangeState();
	const { to, from, fromAmount, toAmount } = exchange.value;
	const [priceQuote, setPriceQuote] = useState<ExchangeRoute>();

	useEffect(() => {
		const loadPrices = async () => {
			const result = await getExchangePrice(from.symbol, to.symbol, toBn(fromAmount || '').toString());
			if (result.error) {
				console.error(result.error);
			} else {
				console.log(result);
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
					<Text>{to.address}</Text>
					<Text>Swapping via</Text>
					<Text>{priceQuote?.priceRoute.bestRoute[0].swaps[0].swapExchanges[0].exchange}</Text>
				</Card.Content>
			</Card>
		</Container>
	);
};

export default ExchangeResumeScreen;
