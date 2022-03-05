import React from 'react';
import { View } from 'react-native';
import { AssetSelectorProps } from './types';
import { Button } from './Button';
import styles from './styles';

const AssetSelector: React.FC<AssetSelectorProps> = ({ active, setActive }) => (
	<View style={styles.container}>
		<Button active={active === 0} onPress={() => setActive(0)}>
			All coins
		</Button>
		<Button active={active === 1} onPress={() => setActive(1)}>
			Stable coins
		</Button>
	</View>
);

export default AssetSelector;
