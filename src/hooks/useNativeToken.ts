import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';

import { Network } from '@models/network';
import { NativeTokens, nativeTokens } from '@models/token';
import { MinkeToken } from '@models/types/token.types';

import useBalances from './useBalances';

const useNativeToken = (network: Network | undefined) => {
	const [nativeToken, setNativeToken] = useState<MinkeToken>();
	const [name, setName] = useState<string>();
	const [balance, setBalance] = useState<BigNumber>();
	const { tokens = [] } = useBalances();

	useEffect(() => {
		const loadNativeToken = async () => {
			if (!network) return;

			const {
				nativeToken: { symbol: nativeTokenSymbol, name: nativeName }
			} = network;
			const native = nativeTokens[nativeTokenSymbol as keyof NativeTokens];
			setNativeToken(native);
			setName(nativeName);
		};

		loadNativeToken();
	}, [network?.id]);

	useEffect(() => {
		if (nativeToken) {
			const token = tokens.find(({ symbol }) => symbol.toLowerCase() === nativeToken.symbol.toLowerCase());
			if (token?.balance) {
				setBalance(parseUnits(token.balance, token.decimals));
				if (!nativeToken.balance) {
					setNativeToken(token);
				}
			}
		}
	}, [nativeToken, tokens]);

	return {
		nativeToken,
		name,
		balance
	};
};

export default useNativeToken;
