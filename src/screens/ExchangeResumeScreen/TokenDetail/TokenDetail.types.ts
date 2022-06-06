import { ParaswapToken } from '@models/token';

export interface TokenDetailProps {
	token: ParaswapToken;
	amount: string;
	usdAmount: number | undefined;
	loading: boolean;
}
