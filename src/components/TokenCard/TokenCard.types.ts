import { DepositProtocol } from '@models/deposit';
import { MinkeGasToken } from '@models/types/token.types';

export interface TokenCardProps {
	token: MinkeGasToken | undefined;
	onPress?: (() => void) | undefined;
	depositProtocol?: DepositProtocol;
	disableMax?: boolean;
	updateQuotes?: Function;
	conversionAmount?: string;
	notTouchable?: boolean;
	apy?: string;
	exchange?: boolean;
	disableAmountValidation?: boolean;
	disableInput?: boolean;
	autoFocus?: boolean;
}
