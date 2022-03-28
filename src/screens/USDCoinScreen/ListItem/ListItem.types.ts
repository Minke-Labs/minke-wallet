import { GestureResponderEvent } from 'react-native';

export interface ListItemProps {
	onPress: (event: GestureResponderEvent) => void;
	label: string;
	selected: boolean;
	token?: string;
}
