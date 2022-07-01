import React, { useCallback, useEffect } from 'react';
import { useState } from '@hookstate/core';
import { globalRedeemState } from '@stores/RedeemStore';
import { REFERRAL_POINTS_TO_USD_CONVERSION } from '@helpers/utilities';

const useRedeemConfirmScreenHooks = () => {
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [count, setCount] = React.useState(60);
	const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();
	const [toTokenAmount, setToTokenAmount] = React.useState<number>();
	const redeemable = { id: 'matic-network', name: 'Matic' };
	const { from: fromToken, to: toToken, value } = useState(globalRedeemState()).value;

	const startCounter = useCallback(() => {
		setCount(60);
		setIntervalId(setInterval(() => setCount((c) => c - 1), 1000));
	}, []);

	const resetInterval = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};

	const loadPrices = async (amount: number) => {
		setLoading(true);
		const result = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${redeemable.id}&vs_currencies=usd`
		);
		const quotes = await result.json();
		const maticQuote = quotes[redeemable.id].usd;
		setLoading(false);
		setToTokenAmount((amount * REFERRAL_POINTS_TO_USD_CONVERSION) / maticQuote);
		setCount(60);
	};

	useEffect(() => {
		resetInterval();
		loadPrices(value);
		startCounter();
	}, []);

	useEffect(() => {
		if (count === 0) {
			loadPrices(value);
		}
	}, [count]);

	useEffect(() => {
		setCount(60);
	}, [toTokenAmount]);

	const onSwapConfirm = async () => {
		setLoading(true);

		// call the API to validate the value and generate the transaction
		setLoading(false);
	};

	return {
		fromToken,
		toToken,
		fromTokenAmount: value.toString(),
		toTokenAmount: toTokenAmount?.toString(),
		usdAmount: value * REFERRAL_POINTS_TO_USD_CONVERSION,
		loading,
		error,
		count,
		onSwapConfirm,
		setError
	};
};

export default useRedeemConfirmScreenHooks;
