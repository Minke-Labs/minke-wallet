import React from 'react';
import View from '@src/components/View/View';

export type Speeds = 'fast' | 'normal' | 'slow';

interface IndicatorContainerProps {
	type: Speeds;
}

export const IndicatorContainer: React.FC<IndicatorContainerProps> = ({ type }) => (
	<View
		h={6}
		w={36}
		row
		main="space-between"
		cross="center"
	>
		<View
			w={24}
			h="100%"
			br="s"
			bgc={type === 'fast' ? 'cta1' : 'text5'}
		/>
		<View
			w={6}
			h={6}
			br="xxxs"
			bgc={type === 'normal' ? 'cta1' : 'text5'}
		/>
	</View>
);
