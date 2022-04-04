import { useEffect, useState } from 'react';
import { NativeTokens, nativeTokens, ParaswapToken } from '@models/token';
import { network } from '@models/network';

const useNativeToken = () => {
	const [nativeToken, setNativeToken] = useState<ParaswapToken>();
	const [name, setName] = useState<string>();

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

	return {
		nativeToken,
		name
	};
};

export default useNativeToken;
