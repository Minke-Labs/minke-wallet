import { useState, useEffect } from 'react';
import { imageSource } from '@models/wallet';
import { useBalances, useGlobalWalletState } from '@hooks';
import { exchangebleTokens } from '@models/token';
import { networks } from '@models/network';
import { UserProps } from '../../Send.types';

interface UseTransactionSelectFundsProps {
	user: UserProps;
}

export const useTransactionSelectFunds = ({ user }: UseTransactionSelectFundsProps) => {
	const [image, setImage] = useState<{ uri: string }>();
	const { network } = useGlobalWalletState();
	const { tokens, stablecoins } = useBalances();

	useEffect(() => {
		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};

		fetchImage();
	}, []);

	const tokensToExchange = tokens
		? network.chainId === networks.matic.chainId
			? tokens.filter(({ symbol }) => exchangebleTokens.includes(symbol.toUpperCase()))
			: tokens
		: [];

	const listTokens = [...stablecoins, ...tokensToExchange.filter((t) => (t.balanceUSD || 0) > 0)];

	return {
		image,
		tokens: listTokens
	};
};
