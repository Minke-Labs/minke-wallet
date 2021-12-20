import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Card, Paragraph } from 'react-native-paper';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { globalWalletState } from '../stores/WalletStore';
import { RootStackParamList } from '../helpers/param-list-type';
import { getSeedPhrase } from '../model/wallet';

export function BackupScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const walletState = useState(globalWalletState());
	const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);

	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);
	if (seed.promised) return <AppLoading />;
	return (
		<View>
			<Appbar.Header>
				<Appbar.Content title="Backup" subtitle="Backup phrase" />
			</Appbar.Header>
			<Card>
				<Card.Content>
					<Paragraph style={{ fontSize: 20 }}>{seed.value}</Paragraph>
					<Button mode="contained" onPress={onFinish}>
						Finish
					</Button>
				</Card.Content>
			</Card>
		</View>
	);
}
