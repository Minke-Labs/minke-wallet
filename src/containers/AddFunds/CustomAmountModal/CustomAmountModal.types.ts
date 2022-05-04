import { RefObject } from 'react';
import { TextInput } from 'react-native';

export interface CustomAmountModalProps {
	setCustomAmount: (value: number | null) => void;
	customAmount: number | null;
	customAmountRef: RefObject<TextInput>;
	onPurchase: () => void;
}
