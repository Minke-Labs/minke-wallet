import { Currency } from '@models/types/currency.types';

export interface CurrencySelectorProps {
	currency: Currency | undefined;
	onPress: () => void;
	notTouchable: boolean;
}
