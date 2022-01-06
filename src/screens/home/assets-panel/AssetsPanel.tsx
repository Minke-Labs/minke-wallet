import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useState } from '@hookstate/core';
import { commify } from 'ethers/lib/utils';
import TextButton from '../../../components/TextButton';
import { globalWalletState } from '../../../stores/WalletStore';
import styles from './styles';
import avatar from './avatar-test.png';

const AssetsPanel = () => {
	const state = useState(globalWalletState());

	if (state.promised) return <AppLoading />;

	const balance = state.value.balance?.usd || '';
	return (
		<View style={styles.paddingContent}>
			<Card style={styles.card}>
				<View style={styles.cardTopContent}>
					<View>
						<Text style={styles.cardLabel}>Your total assets</Text>
						<Text style={styles.cardBalance}>${commify(balance)}</Text>
					</View>
					<View>
						<Image source={avatar} style={styles.avatar} />
					</View>
				</View>
				<View style={styles.cardBottomContent}>
					<TextButton text="Add funds" icon="add-circle-outline" containerStyle={styles.cardDivisor} />
					<TextButton text="Send" icon="arrow-circle-up" />
				</View>
			</Card>
		</View>
	);
};

export default AssetsPanel;
