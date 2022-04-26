import React from 'react';
import { Text } from '@components';
import { View } from 'react-native';
import i18n from '@localization';
import styles from './Header.styles';

const AssetHeader = () => (
	<View style={styles.container}>
		<Text weight="extraBold">{i18n.t('WalletAssetsScreen.asset_header')}</Text>
	</View>
);

export default AssetHeader;
