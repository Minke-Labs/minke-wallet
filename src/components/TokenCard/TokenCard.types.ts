import { ParaswapToken } from '@models/token';

export interface TokenCardProps {
	token: ParaswapToken | undefined;
	onPress?: (() => void) | undefined;
	balance: string;
	disableMax?: boolean;
	updateQuotes?: Function;
	conversionAmount?: string;
	notTouchable?: boolean;
	apy?: string;
	exchange?: boolean;
	noInvalid?: boolean;
}
