import React from 'react';
import { View } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { Card, Text, Icon } from '@components';
import { useNavigation } from '@hooks';
import { numberFormat } from '@src/helpers/utilities';
import { makeStyles } from './Accounts.styles';
import Image from './Image/Image';

const Accounts = () => {
	const navigation = useNavigation();
	const state = useState(globalWalletState());
	const styles = makeStyles();
	return (
		<View style={styles.tabsNetWorth}>
			<View style={styles.currentValueCard}>
				<Text style={styles.cardLabel}>Current value</Text>
				<Text style={styles.cardBalance}>{numberFormat(state.value.balance?.usd || 0)}</Text>
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
							{numberFormat(Number(state.value.balance?.usd || '0'))}
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
						<Text color="text7" type="a">
							Deposit
						</Text>
						<Icon name="arrowForwardStroke" size={16} color="text7" />
					</View>
				}
			/>
			{/* <Card
				image={<Image alert icon="borrowStroke" />}
				title="Debit"
				subtitle="Open loans"
				titleStyle={{ fontSize: 16, fontWeight: '500' }}
				subtitleStyle={{ fontSize: 12, fontWeight: '400' }}
				right={
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text color="text7" type="a">
							Borrow
						</Text>
						<Icon
							name="arrowBackStroke"
							size={16}
							color="text7"
							style={{ transform: [{ rotate: '180deg' }] }}
						/>
					</View>
				}
			/> */}
		</View>
	);
};

export default Accounts;
