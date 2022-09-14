import React from 'react';
import { View, Scroll } from '@components';
import { SelectorProps } from './Selector.types';
import { Button } from './Button/Button';

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => (
	<View row mb="xs">
		<Scroll horizontal hideIndicator>
			<Button active={active === 0} onPress={() => setActive(0)}>
				All Networks
			</Button>
			<Button active={active === 1} onPress={() => setActive(1)}>
				Ethereum
			</Button>
			<Button active={active === 2} onPress={() => setActive(2)}>
				Polygon
			</Button>
			<Button active={active === 3} onPress={() => setActive(3)}>
				BSC
			</Button>
		</Scroll>
	</View>
);

export default Selector;
