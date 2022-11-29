import { MinkeToken } from '@models/types/token.types';

export interface TokenDetailProps {
	token: MinkeToken;
	amount: string;
	usdAmount: number | undefined;
	loading: boolean;
	showNetworkIcon?: boolean;
}
