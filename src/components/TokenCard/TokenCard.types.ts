import { MinkeToken } from '@models/types/token.types';

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
	disableInput?: boolean;
}
