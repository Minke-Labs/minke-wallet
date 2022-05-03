import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from '@components';
import { useLanguage } from '@hooks';
import { whale3Img } from '@images';
import { AssetListEmptyProps } from './AssetListEmpty.types';
import styles from './AssetListEmpty.styles';

const AssetListEmpty: React.FC<AssetListEmptyProps> = ({ onPress }) => {
	const { i18n } = useLanguage();
	return (
		<View style={styles.container}>
			<Image source={whale3Img} style={styles.image} />
			<Text type="p2" marginBottom={15}>
				{i18n.t('walletAssetsScreen.AssetListEmpty.no_tokens_yet')}
			</Text>
			<Text weight="bold" type="p2" marginBottom={65}>
				{i18n.t('walletAssetsScreen.AssetListEmpty.lets_buy_some')}
			</Text>
			<Button
				title={i18n.t('walletAssetsScreen.AssetListEmpty.add_funds_to_start')}
				iconLeft="addStroke"
				onPress={onPress}
			/>
		</View>
	);
};

export default AssetListEmpty;
