import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { Card, Text, Icon } from '@components';
import { useNavigation, useTheme } from '@hooks';
import { IconType } from '@styles';
import { numberFormat } from '@src/helpers/utilities';
import i18n from '@localization';
import Image from './Image/Image';
import styles from './Accounts.styles';

const Right: React.FC<{ balanceType: number }> = ({ balanceType }) => (
	<View style={{ flexDirection: 'row', alignItems: 'center' }}>
		<Text weight="bold" type="p2">
			{numberFormat(balanceType || 0)}
		</Text>
		<Icon name="arrowForwardStroke" size={16} color="text7" />
	</View>
);

const ComingSoonTag = () => {
	const { colors } = useTheme();
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<View
				style={{
					borderRadius: 8,
					backgroundColor: colors.background3,
					paddingHorizontal: 8,
					paddingVertical: 4
				}}
			>
				<Text color="text2" type="span">
					{i18n.t('Accounts.coming_soon')}
				</Text>
			</View>
		</View>
	);
};

const Accounts = () => {
	const navigation = useNavigation();
	const { balance } = useState(globalWalletState()).value;

	const cardArr = useMemo(
		() => [
			{
				title: i18n.t('Accounts.wallet'),
				subtitle: i18n.t('Accounts.available_funds_in_your_wallet'),
				image: 'wallet2Stroke',
				onPress: () => navigation.navigate('WalletAssetsScreen'),
				right: <Right balanceType={balance?.walletBalance || 0} />
			},
			{
				title: i18n.t('Accounts.savings'),
				subtitle: i18n.t('Accounts.funds_deposited_in_savings'),
				image: 'vaultStroke',
				onPress: () => navigation.navigate('SaveScreen'),
				right: <Right balanceType={balance?.depositedBalance || 0} />
			},
			{
				title: i18n.t('Accounts.borrowing'),
				subtitle: i18n.t('Accounts.open_loans'),
				image: 'borrowStroke',
				onPress: () => null,
				right: <ComingSoonTag />
			}
		],
		[balance]
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
					titleStyle={{ fontSize: 16, fontWeight: '500' }}
					subtitleStyle={{ fontSize: 12, fontWeight: '400' }}
					image={<Image icon={item.image as IconType} />}
					onPress={item.onPress}
					right={item.right}
				/>
			))}
		</View>
	);
};

export default Accounts;
