import { MinkeToken } from '@models/types/token.types';

export interface CoinSelectorProps {
	token: MinkeToken | undefined;
	onPress: () => void;
	notTouchable: boolean;
	inline?: boolean;
}

export interface TitlesProps {
	token: MinkeToken;
	inline?: boolean;
	notTouchable?: boolean;
}
