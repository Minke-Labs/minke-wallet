import React, { useState } from 'react';
import { TextInputProps, View } from 'react-native';
import { TextInput as PaperInput, useTheme } from 'react-native-paper';
import styles from './TextInput.styles';

const TextInput = (props: TextInputProps) => {
	const { style, autoFocus, ...other } = props;
	const [isFocused, setIsFocused] = useState(!!autoFocus);
	const { colors } = useTheme();
	return (
		<View style={[styles.inputContainer, isFocused && { borderColor: colors.primary }]}>
			<PaperInput
				{...other}
				style={[style, styles.input]}
				onBlur={() => setIsFocused(false)}
				onFocus={() => setIsFocused(true)}
			/>
		</View>
	);
};

export default TextInput;
