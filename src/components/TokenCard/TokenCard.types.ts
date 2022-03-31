import { RefObject } from 'react';
import { TextInput } from 'react-native';
import { ParaswapToken } from '@models/token';

export interface TokenCardProps {
	token: ParaswapToken | undefined;
	onPress?: (() => void) | undefined;
	balance: string;
	innerRef?: RefObject<TextInput>;
	disableMax?: boolean;
	updateQuotes?: Function;
	conversionAmount?: string;
}
