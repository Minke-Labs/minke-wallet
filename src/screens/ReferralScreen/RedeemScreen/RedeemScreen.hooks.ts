import React, { useEffect } from 'react';
import { useNavigation } from '@hooks';
import { MinkeToken } from '@models/types/token.types';
import { useState } from '@hookstate/core';
import { globalRedeemState } from '@stores/RedeemStore';
import { REFERRAL_POINTS_TO_USD_CONVERSION } from '@helpers/utilities';

const useRedeemScreenHooks = (points: number) => {
	const [fromToken, setFromToken] = React.useState<MinkeToken>();
	const [toToken, setToToken] = React.useState<MinkeToken>();
	const [conversionAmount, setConversionAmount] = React.useState('');
	const [fromConversionAmount, setFromConversionAmount] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [value, setValue] = React.useState(0);
	const redeemable = { id: 'matic-network', name: 'Matic' };
	const navigation = useNavigation();
	const state = useState(globalRedeemState());

	const loadPrices = async (amount: number): Promise<number> => {
		setLoading(true);
		const result = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${redeemable.id}&vs_currencies=usd`
		);
		const quotes = await result.json();
		const maticQuote = quotes[redeemable.id].usd;
		setLoading(false);
		return (amount * REFERRAL_POINTS_TO_USD_CONVERSION) / maticQuote;
	};

	const updateFromQuotes = async (amount: string) => {
		const formatedValue = amount.replace(/,/g, '.');
		if (
			formatedValue &&
			!formatedValue.endsWith('.') &&
			!formatedValue.startsWith('.') &&
			Number(formatedValue) > 0
		) {
			const inputValue = Number(formatedValue);
			const maticQtd = await loadPrices(inputValue);
			setConversionAmount(maticQtd.toString());
			setValue(inputValue);
		}
	};

	useEffect(() => {
		const setup = async () => {
			const maticQtd = await loadPrices(points);
			const balanceUSD = points * REFERRAL_POINTS_TO_USD_CONVERSION;
			setFromToken({ symbol: 'Minke', address: 'minke', decimals: 18, balance: points.toString(), balanceUSD });
			setToToken({ symbol: 'MATIC', address: 'matic', decimals: 18, balance: maticQtd.toString(), balanceUSD });
			setFromConversionAmount(points.toString());
			updateFromQuotes(points.toString());
		};

		setup();
	}, [points]);

	const canSwap = value > 0 && value <= points;

	const onSwap = async () => {
		if (canSwap) {
			state.merge({ from: fromToken, to: toToken, value });
			navigation.navigate('RedeemConfirmScreen');
		}
	};

	return {
		fromToken,
		toToken,
		updateFromQuotes,
		loading,
		conversionAmount,
		fromConversionAmount,
		canSwap,
		onSwap
	};
};

export default useRedeemScreenHooks;
