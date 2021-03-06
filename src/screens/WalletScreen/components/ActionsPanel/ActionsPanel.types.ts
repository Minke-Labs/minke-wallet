import { GestureResponderEvent } from 'react-native';
import { IconType } from '@styles';

interface ActionsPanelProps {
	setSendModalOpen: () => void;
	onExchange: (event: GestureResponderEvent) => void;
	onSwitchAccounts: (event: GestureResponderEvent) => void;
	showReceive: (event: GestureResponderEvent) => void;
}

interface CardProps {
	icon: IconType;
	name: string;
	onPress: (event: GestureResponderEvent) => void;
}

export { ActionsPanelProps, CardProps };
