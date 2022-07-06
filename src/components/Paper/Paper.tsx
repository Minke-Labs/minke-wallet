import { View } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks';

interface PaperProps {
	marginBottom?: number;
	padding?: number;
}

const Paper: React.FC<PaperProps> = ({ children, marginBottom, padding }) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				marginHorizontal: 16,
				backgroundColor: colors.background5,
				borderRadius: 16,
				marginBottom,
				padding,
				overflow: 'hidden'
			}}
		>
			{children}
		</View>
	);
};

export default Paper;
