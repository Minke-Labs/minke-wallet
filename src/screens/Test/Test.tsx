import React, { useEffect } from 'react';
import EventSource from 'react-native-sse';
import { ZAPPER_API_KEY } from '@env';
import { BasicLayout } from '@layouts';
import { Token } from '@components';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { getWalletValue } from './helpers';
import { parse } from './utils';

const Test = () => {
	// const { address } = useState(globalWalletState()).value;
	const address = '0xad0637645341a160c4621a5ae22a709feca37234';
	// stored globally to update
	let tokensBalances = [];

	// add more params here if needed
	const generateUrl = (addresses) => {
		let url = `https://api.zapper.fi/v2/balances?`;
		addresses.forEach((address, _index) => {
			url += `addresses[]=${address}${_index === addresses.length - 1 ? '' : '&'}`;
		});
		return encodeURI(url);
	};

	// User-Agent is necessary for NodeJS environments
	const generateEventSourceDict = () => ({
		withCredentials: true,
		headers: {
			'Content-Type': 'text/event-stream',
			'User-Agent': 'Mozilla/5.0',
			Authorization: `Basic ${Buffer.from(`${ZAPPER_API_KEY || process.env.ZAPPER_API_KEY}:`, 'binary').toString(
				'base64'
			)}`
		}
	});

	// update or push to the current tokens array
	const handleTokenBalance = (tokenBalance) => {
		console.log('marcos', tokenBalance);
		if (tokensBalances.map((item) => item.network).includes(tokenBalance.network)) {
			const index = tokensBalances.findIndex((item) => item.network === tokenBalance.network);
			tokensBalances[index] = tokenBalance;
		} else {
			tokensBalances.push(tokenBalance);
		}
	};

	const fetchBalances = async () => {
		const url = generateUrl([address]);
		const eventSourceDict = generateEventSourceDict();
		const eventSource = new EventSource(url, eventSourceDict);

		// when stream is established
		eventSource.addEventListener('open', () => {
			console.log('Opened');
		});

		// when balance event is received, the data is parsed
		// Zapper objects can be huge so parsing logic is extracted to ./utils.js
		eventSource.addEventListener('balance', ({ data }) => {
			const parsedDatas = JSON.parse(data);
			const { appId, balance } = parsedDatas;
			if (appId === 'tokens' && Object.keys(parsedDatas.balance.wallet).length > 0) {
				console.log({ balance });
				handleTokenBalance(parse(appId, parsedDatas.balance.wallet));
			}
		});

		// when the data feed has been completely sent
		eventSource.addEventListener('end', () => {
			console.log('Tokens in wallet :', tokensBalances);
			console.log('Wallet value :', getWalletValue(tokensBalances));
			eventSource.close();
			console.log('Closed.');
		});

		eventSource.addEventListener('error', ({ message }) => {
			message && console.log('Error :', message);
		});
	};

	useEffect(() => {
		if (address) fetchBalances();
	}, [address]);

	return (
		<BasicLayout>
			<Token name="polydoge" />
		</BasicLayout>
	);
};

export default Test;
