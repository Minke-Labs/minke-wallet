import { GestureResponderEvent } from 'react-native';

export interface ButtonProps {
	onPress?: (event: GestureResponderEvent) => void;
}
