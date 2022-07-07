import React, { useCallback, useEffect } from 'react';
import { useState } from '@hookstate/core';
import { globalRedeemState } from '@stores/RedeemStore';
import { REFERRAL_POINTS_TO_USD_CONVERSION } from '@helpers/utilities';
import { globalWalletState } from '@stores/WalletStore';
import { Wallet } from 'ethers';
import { getProvider } from '@models/wallet';
import { claimRewards } from '@src/services/apis/minke/minke';
import { useLanguage, useNavigation } from '@hooks';

const useRedeemConfirmScreenHooks = () => {
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [count, setCount] = React.useState(60);
	const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();
	const [toTokenAmount, setToTokenAmount] = React.useState<number>();
	const redeemable = { id: 'matic-network', name: 'Matic' };
	const { from: fromToken, to: toToken, value } = useState(globalRedeemState()).value;
	const { address, privateKey } = useState(globalWalletState()).value;
	const { i18n } = useLanguage();
	const navigation = useNavigation();

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

		const wallet = new Wallet(privateKey, await getProvider());
		const points = 100;
		const timestamp = Math.floor(Date.now() / 1000 + 60); // 1 minute from now
		const params = {
			timestamp,
			points
		};
		const message = JSON.stringify(params);
		const signature = await wallet.signMessage(message);

		const request = {
			address,
			points,
			timestamp,
			signature
		};

		const { error: apiError, transfer_id: transferId } = await claimRewards(request);

		if (apiError) {
			setError(i18n.t(`RedeemConfirmScreen.errors.${apiError}`));
		} else if (transferId) {
			navigation.navigate('TransferWaitScreen', { transferId });
		}

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
