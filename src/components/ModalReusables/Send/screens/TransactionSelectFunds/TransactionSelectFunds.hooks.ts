import { useState, useEffect } from 'react';
import { imageSource } from '@models/wallet';
import { useBalances } from '@hooks';
import { exchangebleTokens } from '@models/token';
import { UserProps } from '../../Send.types';

interface UseTransactionSelectFundsProps {
	user: UserProps;
}

export const useTransactionSelectFunds = ({ user }: UseTransactionSelectFundsProps) => {
	const [image, setImage] = useState<{ uri: string }>();
	const { tokens, stablecoins } = useBalances();

	useEffect(() => {
		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};

		fetchImage();
	}, []);

	const tokensToExchange = tokens ?
		tokens.filter(({ symbol }) => exchangebleTokens.includes(symbol.toUpperCase())) :
		[];

	const listTokens = [...stablecoins, ...tokensToExchange];

	return {
		image,
		tokens: listTokens
	};
};
