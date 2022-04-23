import React, { useEffect } from 'react';
import { imageSource } from '@models/wallet';
import { useTokens } from '@hooks';
import { exchangebleTokens } from '@models/token';
import { UserProps } from '../../SendModal.types';

interface UseTransactionSelectFundsProps {
	user: UserProps;
}

export const useTransactionSelectFunds = ({ user }: UseTransactionSelectFundsProps) => {
	const [image, setImage] = React.useState<{ uri: string }>();
	const { tokens = [] } = useTokens();

	useEffect(() => {
		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};

		fetchImage();
	}, []);

	return {
		image,
		tokens: tokens.filter(({ symbol }) => exchangebleTokens.includes(symbol.toUpperCase()))
	};
};
