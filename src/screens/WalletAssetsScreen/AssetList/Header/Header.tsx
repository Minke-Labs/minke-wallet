import React from 'react';
import { Text } from '@components';
import { useLanguage } from '@hooks';
import { View } from 'react-native';
import styles from './Header.styles';

const AssetHeader = () => {
	const { i18n } = useLanguage();
	return (
		<View style={styles.container}>
			<Text weight="extraBold">{i18n.t('WalletAssetsScreen.AssetList.Header.asset_header')}</Text>
		</View>
	);
};

export default AssetHeader;
