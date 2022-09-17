import { TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { SpacingType } from '@styles';

interface InputProps extends Omit<TextInputProps, 'secureTextEntry'> {
	label?: string;
	isPassword?: true | false;
	onSubmit?: Function;
	isFocused?: boolean;
	multiline?: true | false;
	onTogglePassword?: (show: boolean) => void;
	togglePassword?: boolean;
	error?: boolean;
	errorDesc?: string;
	small?: boolean;
	style?: StyleProp<ViewStyle>;
	mb?: SpacingType;
}

interface InputRef {
	focus(): void;
	blur(): void;
}

export type { InputProps, InputRef };
