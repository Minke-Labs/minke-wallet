import React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { ChartAreaGradientsProps } from './ChartAreaGradients.types';

export const ChartAreaGradients: React.FC<ChartAreaGradientsProps> = ({ color }) => (
	<Defs>
		<LinearGradient id="gradient1" x1="50%" y1="0%" x2="50%" y2="100%">
			<Stop offset="0%" stopColor={color} stopOpacity={0.4} />
			<Stop offset="15%" stopColor={color} stopOpacity={0.2} />
			<Stop offset="100%" stopColor={color} stopOpacity={0} />
		</LinearGradient>
	</Defs>
);
