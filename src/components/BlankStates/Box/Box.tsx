import React from 'react';
import { ViewType } from '@styles';
import View from '@src/components/View/View';

const Box: React.FC<Partial<ViewType>> = ({ br = 'xs', ...rest }) => (
	<View bgc="background3" br={br} {...{ ...rest }} />
);

export default Box;
