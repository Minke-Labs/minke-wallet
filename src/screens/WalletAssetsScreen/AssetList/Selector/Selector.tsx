import React from 'react';
import { View } from 'react-native';
import i18n from '@localization';
import { SelectorProps } from './Selector.types';
import { Button } from './Button/Button';
import styles from './Selector.styles';

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => (
	<View style={styles.container}>
		<Button active={active === 0} onPress={() => setActive(0)}>
			{i18n.t('WalletAssetsScreen.Selector.all_coins')}
		</Button>
		<Button active={active === 1} onPress={() => setActive(1)}>
			{i18n.t('WalletAssetsScreen.Selector.stable_coins')}
		</Button>
	</View>
);

export default Selector;
