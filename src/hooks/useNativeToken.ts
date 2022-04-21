import { useEffect, useState } from 'react';
import { NativeTokens, nativeTokens, ParaswapToken } from '@models/token';
import { network } from '@models/network';
import { parseUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import useTokens from './useTokens';

const useNativeToken = () => {
	const [nativeToken, setNativeToken] = useState<ParaswapToken>();
	const [name, setName] = useState<string>();
	const [balance, setBalance] = useState<BigNumber>();
	const { tokens = [] } = useTokens();

	useEffect(() => {
		const loadNativeToken = async () => {
			const {
				nativeToken: { symbol: nativeTokenSymbol, name: nativeName }
			} = await network();
			const native = nativeTokens[nativeTokenSymbol as keyof NativeTokens];
			setNativeToken(native);
			setName(nativeName);
		};

		loadNativeToken();
	}, []);

	useEffect(() => {
		if (nativeToken) {
			const token = tokens.find(({ symbol }) => symbol.toLowerCase() === nativeToken.symbol.toLowerCase());
			if (token) {
				setBalance(parseUnits(token.balance, token.decimals));
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
