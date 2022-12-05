import { Ref } from 'react';
import { TextInput } from 'react-native';

export interface SearchInputProps {
	search: string;
	onSearch: (text: string) => void;
	placeholder?: string;
	marginBottom?: number;
	textInputRef?: Ref<TextInput>;
}
