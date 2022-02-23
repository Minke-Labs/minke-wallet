import React from 'react';
import { View } from 'react-native';
import { commify } from 'ethers/lib/utils';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { Card, Text, Icon } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { makeStyles } from './styles';
import Image from './Image';

const NetWorth = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const state = useState(globalWalletState());
	const styles = makeStyles();
	return (
		<View style={styles.tabsNetWorth}>
			<View style={styles.currentValueCard}>
				<Text style={styles.cardLabel}>Current value</Text>
				<Text style={styles.cardBalance}>${commify(state.value.balance?.usd || '')}</Text>
			</View>
			<Card
				onPress={() => navigation.navigate('WalletAssets')}
				image={<Image />}
				title="Wallet"
				subtitle="Available funds in your wallet"
				titleStyle={{ fontSize: 16, fontWeight: '500' }}
				subtitleStyle={{ fontSize: 12, fontWeight: '400' }}
				right={(
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text weight="bold" style={{ fontSize: 16 }}>
							${commify(state.value.balance?.usd || '')}
						</Text>
						<Icon
							name="arrowForwardStroke"
							size={16}
							color="text7"
						/>
					</View>
				)}
			/>
			<Card
				image={<Image icon="vaultStroke" />}
				title="Deposits"
				subtitle="Funds deposited in vaults"
				titleStyle={{ fontSize: 16, fontWeight: '500' }}
				subtitleStyle={{ fontSize: 12, fontWeight: '400' }}
				right={(
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text color="text7" type="a">
							Deposit
						</Text>
						<Icon
							name="arrowBackStroke"
							size={16}
							color="text7"
							style={{ transform: [{ rotate: '180deg' }] }}
						/>
					</View>
				)}
			/>
			<Card
				image={<Image alert icon="borrowStroke" />}
				title="Debit"
				subtitle="Open loans"
				titleStyle={{ fontSize: 16, fontWeight: '500' }}
				subtitleStyle={{ fontSize: 12, fontWeight: '400' }}
				right={(
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
				)}
			/>
		</View>
	);
};

export default NetWorth;
