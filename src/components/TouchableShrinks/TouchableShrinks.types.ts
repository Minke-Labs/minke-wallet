export interface TouchableShrinksProps {
	shrinks: number;
	disabled: boolean;
	onPress: () => void;
	onPressIn: () => void;
	onPressOut: () => void;
}
