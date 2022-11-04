import { MinkeToken } from '@models/types/token.types';
import { GestureResponderEvent } from 'react-native';

export interface ListItemProps {
	onPress: (event: GestureResponderEvent) => void;
	label: string;
	selected: boolean;
	token: MinkeToken;
	testnet: boolean;
}
