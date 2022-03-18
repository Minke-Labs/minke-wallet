import React from 'react';
import { View } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { Card, Text, Icon } from '@components';
import { useNavigation, useTheme } from '@hooks';
import { numberFormat } from '@src/helpers/utilities';
import Image from './Image/Image';
import styles from './Accounts.styles';

const Accounts = () => {
	const navigation = useNavigation();
	const { balance } = useState(globalWalletState()).value;
	const { colors } = useTheme();

	return (
		<View style={styles.tabsNetWorth}>
			<View style={styles.currentValueCard}>
				<Text style={styles.cardLabel}>Current value</Text>
				<Text style={styles.cardBalance}>{numberFormat(balance?.usd || 0)}</Text>
			</View>
			<Card
				onPress={() => navigation.navigate('WalletAssetsScreen')}
				image={<Image />}
				title="Wallet"
				subtitle="Available funds in your wallet"
				titleStyle={{ fontSize: 16, fontWeight: '500' }}
				subtitleStyle={{ fontSize: 12, fontWeight: '400' }}
				right={
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text weight="bold" style={{ fontSize: 16 }}>
							{numberFormat(balance?.walletBalance || 0)}
						</Text>
						<Icon name="arrowForwardStroke" size={16} color="text7" />
					</View>
				}
			/>
			<Card
				onPress={() => navigation.navigate('SaveScreen')}
				image={<Image icon="vaultStroke" />}
				title="Savings"
				subtitle="Funds deposited in savings"
				titleStyle={{ fontSize: 16, fontWeight: '500' }}
				subtitleStyle={{ fontSize: 12, fontWeight: '400' }}
				right={
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text weight="bold" style={{ fontSize: 16 }}>
							{numberFormat(balance?.depositedBalance || 0)}
						</Text>
						<Icon name="arrowForwardStroke" size={16} color="text7" />
					</View>
				}
			/>
			<Card
				image={<Image alert icon="borrowStroke" />}
				title="Debt"
				subtitle="Open loans"
				titleStyle={{ fontSize: 16, fontWeight: '500' }}
				subtitleStyle={{ fontSize: 12, fontWeight: '400' }}
				right={
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
								Coming soon
							</Text>
						</View>
						{/* <Text color="text7" type="a">
							Borrow
						</Text>
						<Icon
							name="arrowBackStroke"
							size={16}
							color="text7"
							style={{ transform: [{ rotate: '180deg' }] }}
						/> */}
					</View>
				}
			/>
		</View>
	);
};

export default Accounts;
