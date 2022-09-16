import React from 'react';
import View from '@src/components/View/View';

interface RadioProps {
	selected: boolean;
}

const Radio: React.FC<RadioProps> = ({ selected }) => (
	<View
		round={14}
		bw={1}
		bc={selected ? 'cta1' : 'detail1'}
		main="center"
		cross="center"
		mr="xxs"
	>
		<View round={8} {...(selected && { bgc: 'cta1' })} />
	</View>
);

export default Radio;
