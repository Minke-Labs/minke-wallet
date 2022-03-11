import { TextInputProps } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'secureTextEntry'> {
	label: string;
	isPassword?: true | false;
	onSubmit?: Function;
	isFocused?: boolean;
	multiline?: true | false;
	onTogglePassword?: (show: boolean) => void;
	togglePassword?: boolean;
	error?: boolean;
}

interface InputRef {
	focus(): void;
	blur(): void;
}

export type { InputProps, InputRef };
