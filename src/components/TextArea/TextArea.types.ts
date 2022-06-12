import { TextInputProps } from 'react-native';

export interface TextAreaProps {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	numberOfLines?: number;
	style?: TextInputProps;
	ref?: any;
}
