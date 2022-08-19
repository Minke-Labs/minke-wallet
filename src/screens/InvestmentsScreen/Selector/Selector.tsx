import React from 'react';
import { ScrollView } from 'react-native';
import { View } from '@components';
import { SelectorProps } from './Selector.types';
import { Button } from './Button/Button';

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => (
	<View row mb="xs">
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
		</ScrollView>
	</View>
);

export default Selector;
