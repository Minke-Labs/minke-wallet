import { GestureResponderEvent } from 'react-native';

export interface HeaderProps {
	onSettingsPress: (event: GestureResponderEvent) => void;
	onCopyPress: (event: GestureResponderEvent) => void;
	onPointsPress: (event: GestureResponderEvent) => void;
	points: number;
}
