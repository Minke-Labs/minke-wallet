import { MinkeGasToken } from '@models/types/token.types';

export interface CoinSelectorProps {
	token: MinkeGasToken | undefined;
	onPress: () => void;
	notTouchable: boolean;
	inline?: boolean;
}

export interface TitlesProps {
	token: MinkeGasToken;
	inline?: boolean;
	notTouchable?: boolean;
}
