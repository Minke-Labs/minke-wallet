import { GestureResponderEvent } from 'react-native';

export interface OnrampButtonProps {
	onPress?: (event: GestureResponderEvent) => void;
	marginBottom?: number;
	disabled?: boolean;
}
