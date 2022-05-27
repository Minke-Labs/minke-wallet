import { ParaswapToken } from '@models/token';

export interface SelectorHeaderProps {
	token: ParaswapToken;
	onPress: () => void;
	notTouchable: boolean;
	balanceUSD: string;
	tokenBalance: string;
	noToken: boolean;
}
