import React from 'react';
import View from '@src/components/View/View';
import { BlurView } from 'expo-blur';
import { spacing } from '@styles';
import { TransparentCardProps } from './TransparentCard.types';

const TransparentCard: React.FC<Partial<TransparentCardProps>> = ({
	children,
	mb = 'zero',
	row,
	p = 'zero'
}) => (
	<View mb={mb} br="xs" style={{ overflow: 'hidden' }}>
		<BlurView
			intensity={19}
			tint="light"
			style={{
				padding: spacing[p] || spacing.s,
				flexDirection: row ? 'row' : 'column',
				alignItems: 'center'
			}}
		>
			{children}
		</BlurView>
	</View>
);

export default TransparentCard;
