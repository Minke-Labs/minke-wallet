import { TextInputProps } from 'react-native';

export interface TextAreaProps {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	multiline?: boolean;
	numberOfLines?: number;
	style?: TextInputProps;
}
