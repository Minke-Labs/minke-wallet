import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTheme } from '@hooks';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 60,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.08,
		shadowColor: '#000',
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 14
	}
});

interface PaperProps {
	onPress?: (event: GestureResponderEvent) => void;
	marginBottom?: number;
	active?: boolean;
}

const Paper: React.FC<PaperProps> = ({ children, onPress, marginBottom = 0, active = false }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.6}
			style={[
				styles.container,
				{
					marginBottom,
					backgroundColor: active ? colors.text7 : colors.background2
				}
			]}
		>
			{children}
		</TouchableOpacity>
	);
};

export default Paper;
