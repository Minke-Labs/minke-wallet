import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { Card, Text, Icon } from '@components';
import { useNavigation, useLanguage, useNFT } from '@hooks';
import { IconType } from '@styles';
import { numberFormat } from '@src/helpers/utilities';
import Image from './Image/Image';
import styles from './Accounts.styles';

const Accounts = ({ points }: { points: number }) => {
	const { estimatedValue } = useNFT();
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { balance } = useState(globalWalletState()).value;

	const cardArr = useMemo(
		() => [
			{
				title: i18n.t('WalletScreen.screens.Accounts.wallet'),
				subtitle: i18n.t('WalletScreen.screens.Accounts.available_funds_in_your_wallet'),
				thirdRowText: numberFormat(balance?.walletBalance || 0),
				image: 'wallet2Stroke',
				onPress: () => navigation.navigate('WalletAssetsScreen'),
				right: <Icon name="arrowForwardStroke" size={16} color="text7" />
			},
			{
				title: i18n.t('WalletScreen.screens.Accounts.savings'),
				subtitle: i18n.t('WalletScreen.screens.Accounts.funds_deposited_in_savings'),
				thirdRowText: numberFormat(balance?.depositedBalance || 0),
				image: 'vault',
				onPress: () => navigation.navigate('SaveScreen'),
				right: <Icon name="arrowForwardStroke" size={16} color="text7" />
			},
			{
				title: i18n.t('WalletScreen.screens.Accounts.nfts'),
				subtitle: i18n.t('WalletScreen.screens.Accounts.estimated_value'),
				thirdRowText: estimatedValue,
				image: 'robotStroke',
				onPress: (): any => navigation.navigate('NFTScreen'),
				right: <Icon name="arrowForwardStroke" size={16} color="text7" />
			},
			{
				title: i18n.t('WalletScreen.screens.Accounts.points'),
				subtitle: i18n.t('WalletScreen.screens.Accounts.points_earned'),
				thirdRowText: `${points} ${i18n.t('WalletScreen.screens.Accounts.points')}`,
				image: 'gift',
				onPress: () => navigation.navigate('ReferralScreen'),
				right: <Icon name="arrowForwardStroke" size={16} color="text7" />
			}
		],
		[balance, points]
	);

	return (
		<View style={styles.tabsNetWorth}>
			<View style={styles.currentValueCard}>
				<Text style={styles.cardLabel}>Current value</Text>
				<Text style={styles.cardBalance}>{numberFormat(balance?.usd || 0)}</Text>
			</View>

			{cardArr.map((item) => (
				<Card
					key={item.title}
					title={item.title}
					subtitle={item.subtitle}
					thirdRowText={item?.thirdRowText}
					titleStyle={{ fontSize: 16, fontWeight: '600' }}
					subtitleStyle={{ fontSize: 12, fontWeight: '600' }}
					thirdRowStyle={{ fontSize: 16, fontWeight: '600' }}
					image={<Image icon={item.image as IconType} />}
					onPress={item.onPress}
					right={item.right}
				/>
			))}
		</View>
	);
};

export default Accounts;
