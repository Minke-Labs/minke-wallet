import { Currency } from '@models/types/currency.types';

export interface FiatCardProps {
	currency: Currency | undefined;
	onPress?: (() => void) | undefined;
	disableMax?: boolean;
	updateQuotes?: Function;
	conversionAmount?: string;
	notTouchable?: boolean;
	disableAmountValidation?: boolean;
	disableInput?: boolean;
}
