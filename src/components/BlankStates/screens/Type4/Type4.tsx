import React from 'react';
import Box from '../../Box/Box';
import BlankLayout from '../../BlankLayout/BlankLayout';

interface Type4Props {
	h: number;
	w?: number | string;
}

const Type4: React.FC<Type4Props> = ({ h, w = '100%' }) => (
	<BlankLayout>
		<Box
			h={h}
			w={w}
			br="xs"
		/>
	</BlankLayout>
);

export default Type4;
