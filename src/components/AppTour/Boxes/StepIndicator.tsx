import React from 'react';
import View from '@src/components/View/View';
import { AppTourStepType } from '../AppTour.types';

const Circle: React.FC<{ active: boolean }> = ({ active }) => (
	<View
		round={8}
		mr="xxs"
		bgc={active ? 'cta1' : 'cta2'}
	/>
);

const StepIndicator: React.FC<{ type: AppTourStepType }> = ({ type }) => (
	<View
		row
		main="center"
		pv="xxxs"
		mb="xs"
	>
		{[0, 1, 2, 3, 4].map((item: number) => <Circle key={item.toString()} active={type === item} />)}
	</View>
);

export default StepIndicator;
