import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Icon } from '@components';
import makeBlockie from 'ethereum-blockies-base64';
import { useTheme, useLanguage } from '@hooks';
import { numberFormat } from '@helpers/utilities';
import styles from './AssetsPanel.styles';
import { AssetsPanelProps } from './AssetsPanel.types';

const AssetsPanel: React.FC<AssetsPanelProps> = ({
	balance,
	address,
	onAddFunds,
	onSave,
	onWalletAssets,
	onAvatarClick
}) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();

	return (
		<View style={styles.assetsContainer}>
			<TouchableOpacity
				style={[styles.assetsMain, { backgroundColor: colors.background2 }]}
				onPress={onWalletAssets}
			>
				<View>
					<Text type="a" marginBottom={8}>
						{i18n.t('WalletScreen.AssetsPanel.your_total_assets')}
					</Text>
					<Text type="h1" weight="medium">
						{numberFormat(balance || 0)}
					</Text>
				</View>
				<TouchableOpacity onPress={onAvatarClick}>
					<View>
						{!!address && <Image source={{ uri: makeBlockie(address) }} style={styles.avatar} />}
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
			<View style={[styles.buttonsContainer, { borderTopColor: colors.background1 }]}>
				<TouchableOpacity
					onPress={onAddFunds}
					activeOpacity={0.6}
					style={[
						styles.addFundsButtonContainer,
						{ backgroundColor: colors.background2, borderRightColor: colors.background1 }
					]}
				>
					<Icon name="addStroke" color="cta1" size={20} style={{ marginRight: 8 }} />
					<Text type="a">{i18n.t('WalletScreen.AssetsPanel.add_funds')}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={onSave}
					activeOpacity={0.6}
					style={[
						styles.sendButtonContainer,
						{ backgroundColor: colors.background2, borderLeftColor: colors.background1 }
					]}
				>
					<Icon name="saveStroke" color="cta1" size={20} style={{ marginRight: 8 }} />
					<Text type="a">{i18n.t('WalletScreen.AssetsPanel.save')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default AssetsPanel;
