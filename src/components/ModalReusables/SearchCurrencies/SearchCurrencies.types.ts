import { Currency } from '@models/types/currency.types';

export interface SearchCurrenciesProps {
	visible: boolean;
	onDismiss: any;
	onCurrencySelect: Function;
	selected?: Currency | undefined;
}
