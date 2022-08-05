import { TextInputProps, StyleProp, ViewStyle } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'secureTextEntry'> {
	label?: string;
	onSubmit?: Function;
	isFocused?: boolean;
	multiline?: true | false;
	error?: boolean;
	style?: StyleProp<ViewStyle>;
	openModal: () => void;
}

interface InputRef {
	focus(): void;
	blur(): void;
}

export type { InputProps, InputRef };
