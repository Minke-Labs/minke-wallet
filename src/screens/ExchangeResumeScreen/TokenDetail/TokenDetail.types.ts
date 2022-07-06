import { MinkeToken } from '@models/token';

export interface TokenDetailProps {
	token: MinkeToken;
	amount: string;
	usdAmount: number | undefined;
	loading: boolean;
}
