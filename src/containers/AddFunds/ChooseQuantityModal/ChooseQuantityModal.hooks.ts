import { useEffect } from 'react';
import { ICoin } from '@helpers/coins';

const DEFAULT_VALUE = 100;

interface UseChooseQuantityModalProps {
	coin: ICoin;
	setPresetAmount: Function;
}

export const useChooseQuantityModal = ({ coin, setPresetAmount }: UseChooseQuantityModalProps) => {
	const { name, symbol: coinSymbol } = coin;
	let symbol = coinSymbol;
	if (symbol === 'MUSDC') {
		symbol = 'USDC';
	}

	useEffect(() => {
		setPresetAmount(DEFAULT_VALUE);
	}, []);

	return {
		name,
		symbol
	};
};
