import { MinkeToken } from '@models/token';

export interface TokenCardProps {
	token: MinkeToken | undefined;
	onPress?: (() => void) | undefined;
	disableMax?: boolean;
	updateQuotes?: Function;
	conversionAmount?: string;
	notTouchable?: boolean;
	apy?: string;
	exchange?: boolean;
	disableAmountValidation?: boolean;
	oneSideExchange?: boolean;
}
