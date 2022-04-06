import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, Icon } from '@components';
import { useTheme } from '@hooks';
import { styles } from './CopyButton.styles';
import { ButtonProps } from './CopyButton.types';

const CopyButton: React.FC<ButtonProps> = ({ onPress }) => {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[styles.container, { backgroundColor: colors.background4 }]}
			onPress={onPress}
		>
			<Icon name="copyStroke" size={16} color="text1" />
			<Text type="a" style={{ marginLeft: 8 }}>
				Copy to clipboard
			</Text>
		</TouchableOpacity>
	);
};

export default CopyButton;