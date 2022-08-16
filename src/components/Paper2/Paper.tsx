import { ViewType } from '@styles';
import React from 'react';
import View from '../View/View';

const Paper: React.FC<Partial<ViewType>> = ({
	children,
	...rest
}) => (
	<View
		bg="background5"
		{...{ ...rest }}
	>
		{children}
	</View>
);

export default Paper;
