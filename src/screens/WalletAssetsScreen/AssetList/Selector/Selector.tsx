import React from 'react';
import { View } from 'react-native';
import { useLanguage } from '@hooks';
import { SelectorProps } from './Selector.types';
import { Button } from './Button/Button';
import styles from './Selector.styles';

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => {
	const { i18n } = useLanguage();
	return (
		<View style={styles.container}>
			<Button active={active === 0} onPress={() => setActive(0)}>
				{i18n.t('WalletAssetsScreen.AssetList.Selector.all_coins')}
			</Button>
			<Button active={active === 1} onPress={() => setActive(1)}>
				{i18n.t('WalletAssetsScreen.AssetList.Selector.stable_coins')}
			</Button>
		</View>
	);
};

export default Selector;
