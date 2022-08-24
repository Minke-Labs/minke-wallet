import { View, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks';

interface PaperProps {
	marginBottom?: number;
	padding?: number;
	margin?: number;
	style?: StyleProp<ViewStyle>;
}

const Paper: React.FC<PaperProps> = ({ children, marginBottom, padding, margin = 0, style }) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				backgroundColor: colors.background5,
				borderRadius: 16,
				marginBottom,
				padding,
				overflow: 'hidden',
				...(style as object),
				margin
			}}
		>
			{children}
		</View>
	);
};

export default Paper;
