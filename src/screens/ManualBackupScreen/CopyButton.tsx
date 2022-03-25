import { StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import React from 'react';
import { Text, Icon } from '@components';
import { useTheme } from '@hooks';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 60,
		width: '100%',
		shadowColor: '#000',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.08
	}
});

interface ButtonProps {
	onPress?: (event: GestureResponderEvent) => void;
}

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
