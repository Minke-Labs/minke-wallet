import { MinkeToken } from '@models/token';

export interface CoinSelectorProps {
	token: MinkeToken | undefined;
	onPress: () => void;
	notTouchable: boolean;
	inline?: boolean;
}
