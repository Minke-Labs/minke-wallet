import React from 'react';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { TransparentCardProps } from './TransparentCard.types';

const TransparentCard: React.FC<Partial<TransparentCardProps>> = ({ children, marginBottom = 0, row, padding }) => (
	<View
		style={{
			borderRadius: 16,
			overflow: 'hidden',
			marginBottom
		}}
	>
		<BlurView
			intensity={19}
			tint="light"
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

export default TransparentCard;
