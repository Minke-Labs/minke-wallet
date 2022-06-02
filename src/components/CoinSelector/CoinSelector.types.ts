import { ParaswapToken } from '@models/token';

export interface CoinSelectorProps {
	token: ParaswapToken;
	onPress: () => void;
	notTouchable: boolean;
	balanceUSD: string;
	tokenBalance: string;
	noToken: boolean;
	inline?: boolean;
}
