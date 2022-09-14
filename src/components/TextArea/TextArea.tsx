import React from 'react';
import { useTheme } from '@hooks';
import { View, TextInput } from 'react-native';
import Text from '@src/components/Text/Text';
import styles from './TextArea.styles';
import { TextAreaProps } from './TextArea.types';

// @@@TODO: Ask Franz about the screen where this is used in order to refactor.
const TextArea: React.FC<TextAreaProps> = ({ label, value, onChangeText, numberOfLines = 6, style }) => {
	const { colors } = useTheme();
	return (
		<View>
			<Text
				color="text7"
				style={styles.label}
			>
				{label}
			</Text>
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
				autoCorrect={false}
				multiline
				{...{ numberOfLines, onChangeText, value }}
			/>
		</View>
	);
};

export default TextArea;
