import React from 'react';
import { ViewType } from '@styles';
import View from '@src/components/View/View';

const Paper: React.FC<Partial<ViewType>> = ({ children, br = 'xs', ...rest }) => (
	<View bgc="background5" br={br} {...{ ...rest }}>
		{children}
	</View>
);

export default Paper;
