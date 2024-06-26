import { CovalentToken } from '@src/services/tokenConverter/tokenConverter.types';

export interface BalanceApiResponse {
	data: {
		address: string;
		updated_at: string;
		next_update_at: string;
		quote_currency: string;
		chain_id: number;
		items: CovalentToken[];
	};
	error: boolean;
	error_message: string;
	error_code: number;
}
