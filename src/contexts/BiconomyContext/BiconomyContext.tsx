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

	const initialize = () => {
		if (biconomyClient !== undefined) return;
		if (jsonRpcProvider && biconomyAPIKey) {
			const alchemy = new providers.JsonRpcProvider(jsonRpcProvider);
			const biconomy = new Biconomy(alchemy, {
				apiKey: biconomyAPIKey,
				debug: __DEV__
			});
			setBiconomyClient(biconomy);
		} else {
			setBiconomyClient(null);
		}
	};

	useEffect(() => {
		initialize();
	}, []);

	const obj = useMemo(() => biconomyClient, [biconomyClient, biconomyAPIKey]);

	return <BiconomyContext.Provider value={obj}>{children}</BiconomyContext.Provider>;
};

export default BiconomyProvider;
