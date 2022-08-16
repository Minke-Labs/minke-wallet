import React from 'react';
import { View } from '@components';
import { useLanguage } from '@hooks';
import { SelectorProps } from './Selector.types';
import { Button } from './Button/Button';

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => {
	const { i18n } = useLanguage();
	return (
		<View h={31} ph={4} row mb={3}>
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
