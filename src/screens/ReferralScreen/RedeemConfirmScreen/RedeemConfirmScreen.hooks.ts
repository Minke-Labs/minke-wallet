import React, { useEffect } from 'react';
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
	const [toTokenAmount, setToTokenAmount] = React.useState<number>();
	const { from: fromToken, to: toToken, value } = useState(globalRedeemState()).value;
	const { address, privateKey } = useState(globalWalletState()).value;
	const { i18n } = useLanguage();
	const navigation = useNavigation();

	const loadPrices = async (amount: number) => {
		setLoading(true);
		setToTokenAmount(amount * REFERRAL_POINTS_TO_USD_CONVERSION);
		setLoading(false);
	};

	useEffect(() => {
		loadPrices(value);
	}, []);

	const onSwapConfirm = async () => {
		setLoading(true);

		const wallet = new Wallet(privateKey, await getProvider());
		const points = value;
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
		onSwapConfirm,
		setError
	};
};

export default useRedeemConfirmScreenHooks;
