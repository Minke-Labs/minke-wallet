import { useState, useEffect } from 'react';
import { imageSource } from '@models/wallet';
import { useBalances } from '@hooks';
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

	const listTokens = [...stablecoins, ...tokens.filter((t) => (t.balanceUSD || 0) > 0)];

	return {
		image,
		tokens: listTokens
	};
};
