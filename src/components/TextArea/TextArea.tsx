import React from 'react';
import { TextInput, View } from 'react-native';

import { useTheme } from '@hooks';
import Text from '@src/components/Text/Text';

import styles from './TextArea.styles';
import { TextAreaProps } from './TextArea.types';

const TextArea: React.FC<TextAreaProps> = ({
	label,
	value,
	onChangeText,
	numberOfLines = 6,
	style,
	disabled = false
}) => {
	const { colors } = useTheme();
	return (
		<View>
			{!!label && (
				<Text color="text7" style={styles.label}>
					{label}
				</Text>
			)}
			<TextInput
				style={[
					styles.textarea,
					{
						backgroundColor: colors.background4,
						borderColor: colors.text7,
						color: colors.text1,
						paddingTop: !label ? 8 : 24,
						...(style && { ...(style as object) })
					}
				]}
				selectionColor={colors.text7}
				spellCheck={false}
				autoCapitalize="none"
				autoCorrect={false}
				multiline
				editable={!disabled}
				selectTextOnFocus={!disabled}
				{...{ numberOfLines, onChangeText, value }}
			/>
		</View>
	);
};

export default TextArea;
