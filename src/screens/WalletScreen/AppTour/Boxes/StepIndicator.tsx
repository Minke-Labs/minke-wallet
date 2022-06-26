import { View } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks';
import { AppTourStepType } from '../AppTour.types';

const Circle: React.FC<{ active: boolean }> = ({ active }) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				height: 8,
				width: 8,
				borderRadius: 4,
				backgroundColor: active ? colors.cta1 : colors.cta2,
				marginRight: 8
			}}
		/>
	);
};

const StepIndicator: React.FC<{ type: AppTourStepType }> = ({ type }) => (
	<View
		style={{
			alignSelf: 'center',
			flexDirection: 'row',
			alignItems: 'center',
			padding: 4,
			marginBottom: 16
		}}
	>
		{[0, 1, 2, 3, 4, 5].map((item: number) => <Circle active={type === item} />)}
	</View>
);

export default StepIndicator;
