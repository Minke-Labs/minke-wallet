import React from 'react';
import { useColorScheme, View } from 'react-native';
import { BlurView } from 'expo-blur';

interface TransparentCardProps {
	marginBottom: number;
	row: boolean;
	padding: number;
}

const TransparentCard: React.FC<Partial<TransparentCardProps>> = ({ children, marginBottom = 0, row, padding }) => {
	const scheme = useColorScheme();
	return (
		<View
			style={{
				borderRadius: 18,
				overflow: 'hidden',
				marginBottom
			}}
		>
			<BlurView
				intensity={12}
				tint={scheme === 'dark' ? 'dark' : 'light'}
				style={{
					padding: padding || 24,
					flexDirection: row ? 'row' : 'column',
					alignItems: 'center'
				}}
			>
				{children}
			</BlurView>
		</View>
	);
};

export default TransparentCard;
