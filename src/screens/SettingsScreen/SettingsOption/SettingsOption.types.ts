import { GestureResponderEvent } from 'react-native';
import { IconType } from '@styles';

export interface SettingsOptionProps {
	label: string;
	icon: IconType;
	onPress: (event: GestureResponderEvent) => void;
	newTab?: boolean;
}
