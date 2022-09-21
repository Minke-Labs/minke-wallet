import React, { useState, createContext, useEffect, useMemo } from 'react';
import { providers } from 'ethers';
// @ts-ignore
import { Biconomy } from '@biconomy/mexa';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';

export const BiconomyContext = createContext<any>(null);

const BiconomyProvider: React.FC = ({ children }) => {
	const {
		network: { jsonRpcProvider, biconomyAPIKey },
		address,
		privateKey
	} = useGlobalWalletState();

	const [biconomyClient, setBiconomyClient] = useState<any | null>();
	const [status, setStatus] = useState('');
	const [gaslessEnabled, setGaslessEnabled] = useState(true);

	const canSubmitGaslessTransaction = async () => {
		if (biconomyAPIKey && address && privateKey) {
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
				debug: false,
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
	}, [status, address, privateKey]);

	const obj = useMemo(
		() => ({
			biconomy: biconomyClient,
			gaslessEnabled:
				false && !!biconomyClient && biconomyClient.status === biconomyClient.READY && gaslessEnabled
		}),
		[biconomyClient, status, biconomyAPIKey, address, gaslessEnabled, privateKey]
	);

	return <BiconomyContext.Provider value={obj}>{children}</BiconomyContext.Provider>;
};

export default BiconomyProvider;
