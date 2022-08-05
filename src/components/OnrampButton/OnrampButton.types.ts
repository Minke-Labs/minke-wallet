import { GestureResponderEvent } from 'react-native';
import { Currency } from '@models/types/currency.types';

export interface OnrampButtonProps {
	onPress?: (event: GestureResponderEvent) => void;
	currency: Currency | undefined;
	marginBottom?: number;
	disabled?: boolean;
}
