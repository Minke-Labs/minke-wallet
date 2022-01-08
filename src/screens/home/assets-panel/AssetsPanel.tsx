import React from 'react';
import { View, Image, useColorScheme } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useState } from '@hookstate/core';
import { commify } from 'ethers/lib/utils';
import { Text, Card, useTheme } from 'react-native-paper';
import TextButton from '@components/TextButton';
import { globalWalletState } from '@stores/WalletStore';
import makeBlockie from 'ethereum-blockies-base64';
import { makeStyles } from './styles';

const AssetsPanel = () => {
	const state = useState(globalWalletState());
	const { colors } = useTheme();
	const styles = makeStyles(colors, useColorScheme());

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
						<Image source={{ uri: makeBlockie(state.value.wallet?.address || '') }} style={styles.avatar} />
					</View>
				</View>
				<View style={styles.cardBottomContent}>
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
