import React from 'react';
import { useTheme } from 'react-native-paper';
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
			<Text style={[styles.label, { color: colors.primary }]}>{label}</Text>
			<TextInput
				style={[
					styles.textarea,
					{
						backgroundColor: colors.fill,
						borderColor: colors.primary,
						color: colors.text,
						...(style && { ...(style as object) })
					}
				]}
				selectionColor={colors.primary}
				spellCheck={false}
				autoCapitalize="none"
				autoFocus
				autoCorrect={false}
				multiline
				{...{ numberOfLines, onChangeText, value }}
			/>
		</View>
	);
};

export default TextArea;
