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
		network: { jsonRpcProvider, biconomyAPIKey }
	} = wallet.value;

	const [biconomyClient, setBiconomyClient] = React.useState<any | null>();
	const [status, setStatus] = React.useState('');

	const initialize = () => {
		if (biconomyClient !== undefined) return;
		if (jsonRpcProvider && biconomyAPIKey) {
			const alchemy = new providers.JsonRpcProvider(jsonRpcProvider);
			const biconomy = new Biconomy(alchemy, {
				apiKey: biconomyAPIKey,
				debug: __DEV__
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

	const obj = useMemo(
		() => ({
			biconomy: biconomyClient,
			gaslessEnabled: !!biconomyClient && biconomyClient.status === biconomyClient.READY
		}),
		[biconomyClient, status, biconomyAPIKey]
	);

	return <BiconomyContext.Provider value={obj}>{children}</BiconomyContext.Provider>;
};

export default BiconomyProvider;
