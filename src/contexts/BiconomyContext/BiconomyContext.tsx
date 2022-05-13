import React, { createContext, useEffect, useMemo } from 'react';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@src/stores/WalletStore';
import { providers } from 'ethers';
// @ts-ignore
import { Biconomy } from '@biconomy/mexa';

export const BiconomyContext = createContext<any>(null);

const BiconomyProvider: React.FC = ({ children }) => {
	const wallet = useState(globalWalletState());
	const {
		network: { jsonRpcProvider, biconomyAPIKey },
		address
	} = wallet.value;

	const [biconomyClient, setBiconomyClient] = React.useState<any | null>();
	const [status, setStatus] = React.useState('');
	const [gaslessEnabled, setGaslessEnabled] = React.useState(true);

	const canSubmitGaslessTransaction = async () => {
		if (biconomyAPIKey && address) {
			try {
				const { allowed } = await (
					await fetch(`https://api.biconomy.io/api/v1/dapp/checkLimits?userAddress=${address}`, {
						headers: {
							'Content-Type': 'application/json',
							'x-api-key': biconomyAPIKey
						}
					})
				).json();
				return setGaslessEnabled(!!allowed);
			} catch {
				return setGaslessEnabled(false);
			}
		}
		return setGaslessEnabled(false);
	};

	const initialize = () => {
		if (biconomyClient !== undefined) return;
		if (jsonRpcProvider && biconomyAPIKey) {
			const alchemy = new providers.JsonRpcProvider(jsonRpcProvider);
			const biconomy = new Biconomy(alchemy, {
				apiKey: biconomyAPIKey,
				debug: true,
				strict: false
			});
			setBiconomyClient(biconomy);
			biconomy
				.onEvent(biconomy.READY, () => {
					setBiconomyClient(biconomy);
					setStatus(biconomy.READY);
				})
				.onEvent(biconomy.ERROR, () => {
					setBiconomyClient(null);
					setStatus(biconomy.ERROR);
				});
		} else {
			setBiconomyClient(null);
		}
	};

	useEffect(() => {
		if (biconomyAPIKey) {
			initialize();
		} else {
			setBiconomyClient(undefined);
			setStatus('');
		}
	}, [biconomyAPIKey]);

	useEffect(() => {
		canSubmitGaslessTransaction();
	}, [status, address]);

	const obj = useMemo(
		() => ({
			biconomy: biconomyClient,
			gaslessEnabled: !!biconomyClient && biconomyClient.status === biconomyClient.READY && gaslessEnabled
		}),
		[biconomyClient, status, biconomyAPIKey, address, gaslessEnabled]
	);

	return <BiconomyContext.Provider value={obj}>{children}</BiconomyContext.Provider>;
};

export default BiconomyProvider;
