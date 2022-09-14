import React from 'react';
import { ViewType } from '@styles';
import View from '@src/components/View/View';

interface BoxProps extends ViewType {
	invert?: boolean;
}

const Box: React.FC<Partial<BoxProps>> = ({ br = 'xs', invert, ...rest }) => (
	<View bgc={invert ? 'background8' : 'background3'} br={br} {...{ ...rest }} />
);

export default Box;
