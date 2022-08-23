import { ViewType } from '@styles';
import React from 'react';
import View from '../View/View';

const Paper: React.FC<Partial<ViewType>> = ({
	children,
	br = 'xs',
	...rest
}) => (
	<View
		bgc="background5"
		br={br}
		{...{ ...rest }}
	>
		{children}
	</View>
);

export default Paper;
