import { FlagType } from '@styles';

export interface ItemCurrencyProps {
	flag: FlagType;
	currencyName: string;
	active: boolean;
	onPress: () => void;
}
