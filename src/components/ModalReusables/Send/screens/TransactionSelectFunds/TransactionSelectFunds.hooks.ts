import { useState, useEffect } from 'react';
import { imageSource } from '@models/wallet';
import { useTokens } from '@hooks';
import { exchangebleTokens } from '@models/token';
import { UserProps } from '../../Send.types';

interface UseTransactionSelectFundsProps {
	user: UserProps;
}

export const useTransactionSelectFunds = ({ user }: UseTransactionSelectFundsProps) => {
	const [image, setImage] = useState<{ uri: string }>();
	const { accountBalance } = useTokens();
	const { tokens } = accountBalance;

	useEffect(() => {
		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};

		fetchImage();
	}, []);

	return {
		image,
		tokens: tokens ? tokens.filter(({ symbol }) => exchangebleTokens.includes(symbol.toUpperCase())) : undefined
	};
};
