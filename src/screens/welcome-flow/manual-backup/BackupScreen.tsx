import React, { useCallback } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Headline, Subheading } from 'react-native-paper';
import { RootStackParamList } from '../../../helpers/param-list-type';
import { getSeedPhrase } from '../../../model/wallet';
import { globalWalletState } from '../../../stores/WalletStore';
import styles from './styles';
import imageCopyPast from './icon-copy-and-past.png';

export function BackupScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);

	const walletState = useState(globalWalletState());
	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);
	if (seed.promised) return <AppLoading />;
	return (
		<View style={styles.container}>
			<Headline style={styles.headline}>Recovery phrase</Headline>
			<Subheading style={styles.subheading}>
				Write this down on paper or save it in your password manager.
			</Subheading>

			<View style={styles.backupWordContainer}>
				{seed.value?.split(' ').map((word, index) => (
					<Text key={word} style={styles.backupWordItem}>
						<View style={styles.backupWordNumberPadding}>
							<Text style={styles.backupWordNumber}>{index + 1}</Text>
						</View>
						<View style={styles.backupWordPadding}>
							<Text>{word}</Text>
						</View>
					</Text>
				))}
			</View>

			<TouchableOpacity style={styles.copyPastButton}>
				<Image source={imageCopyPast} />
				<Text>Copy to clipboard</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.copyPastButton} onPress={onFinish}>
				<Text>Done</Text>
			</TouchableOpacity>
		</View>
	);
}
