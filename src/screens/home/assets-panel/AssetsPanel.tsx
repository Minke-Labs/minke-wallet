import React from 'react';
import { View, Image, useColorScheme } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useState } from '@hookstate/core';
import { commify } from 'ethers/lib/utils';
import { Text, useTheme } from 'react-native-paper';
import { Card, SecondaryText } from '../../../components/Overrides';
import TextButton from '../../../components/TextButton';
import { globalWalletState } from '../../../stores/WalletStore';
import styles from './styles';
import avatar from './avatar-test.png';

const AssetsPanel = () => {
	const state = useState(globalWalletState());
	const { colors } = useTheme();
	const scheme = useColorScheme();
	if (state.promised) return <AppLoading />;

	const balance = state.value.balance?.usd || '';
	return (
		<View style={styles.paddingContent}>
			<Card style={styles.card}>
				<View style={styles.cardTopContent}>
					<View>
						<SecondaryText style={styles.cardLabel}>Your total assets</SecondaryText>
						<Text style={styles.cardBalance}>${commify(balance)}</Text>
					</View>
					<View>
						<Image source={avatar} style={styles.avatar} />
					</View>
				</View>
				<View
					style={[
						styles.cardBottomContent,
						{ borderTopColor: colors.background },
						{ backgroundColor: scheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF' }
					]}
				>
					<TextButton
						text="Add funds"
						icon="add-circle-outline"
						containerStyle={[styles.cardDivisor, { borderRightColor: colors.background }]}
					/>
					<TextButton text="Send" icon="arrow-circle-up" />
				</View>
			</Card>
		</View>
	);
};

export default AssetsPanel;
