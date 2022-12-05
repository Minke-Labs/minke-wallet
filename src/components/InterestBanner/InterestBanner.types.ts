import { DepositProtocol } from '@models/deposit';

export interface InterestBannerProps {
	apy: string;
	token?: boolean;
	bold?: boolean;
	depositProtocol?: DepositProtocol;
}
