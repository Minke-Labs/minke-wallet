import React from 'react';
import { useTheme } from '@hooks';
import { View, TextInput, Text } from 'react-native';
import styles from './TextArea.styles';
import { TextAreaProps } from './TextArea.types';

const TextArea: React.FC<TextAreaProps> = ({
	label,
	value,
	onChangeText,
	numberOfLines = 6,
	style
}) => {
	const { colors } = useTheme();
	return (
		<View>
			<Text style={[styles.label, { color: colors.text7 }]}>{label}</Text>
			<TextInput
				style={[
					styles.textarea,
					{
						backgroundColor: colors.background4,
						borderColor: colors.text7,
						color: colors.text1,
						...(style && { ...(style as object) })
					}
				]}
				selectionColor={colors.text7}
				spellCheck={false}
				autoCapitalize="none"
				// autoFocus
				autoCorrect={false}
				multiline
				{...{ numberOfLines, onChangeText, value }}
			/>
		</View>
	);
};

export default TextArea;
