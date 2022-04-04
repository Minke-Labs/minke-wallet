import { GestureResponderEvent } from 'react-native';

export interface CardProps {
	failed: boolean;
	title: string;
	token: string;
	subtitle: string;
	received: boolean;
	pending: boolean;
	value: any;
	tokenDecimal: any;
	tokenSymbol: any;
	onPress?: (event: GestureResponderEvent) => void;
	marginBottom?: number;
}
