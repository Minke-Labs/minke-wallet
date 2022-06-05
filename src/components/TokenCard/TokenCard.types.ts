import { RefObject } from 'react';
import { TextInput } from 'react-native';
import { MinkeToken, ParaswapToken } from '@models/token';

export interface TokenCardProps {
	token: ParaswapToken | undefined;
	tokens?: MinkeToken[];
	onPress?: (() => void) | undefined;
	balance: string;
	innerRef?: RefObject<TextInput>;
	disableMax?: boolean;
	updateQuotes?: Function;
	conversionAmount?: string;
	notTouchable?: boolean;
	apy?: string;
	tokenBalance: string;
	exchange?: boolean;
	noMax?: boolean;
	noInvalid?: boolean;
}
