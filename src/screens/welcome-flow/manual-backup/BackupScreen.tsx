import React, { useCallback } from 'react';
import { Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Headline, Subheading, Snackbar, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { RootStackParamList } from '../../../helpers/param-list-type';
import { getSeedPhrase } from '../../../model/wallet';
import { globalWalletState } from '../../../stores/WalletStore';
import styles from './styles';
import WelcomeContainer from '../WelcomeContainer';

export function BackupScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const snackbarVisible = useState(false);
	const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);
	const scheme = useColorScheme();
	const { colors } = useTheme();

	const walletState = useState(globalWalletState());
	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);
	if (seed.promised) return <AppLoading />;

	const onCopyToClipboard = () => {
		Clipboard.setString(seed.value || '');
		snackbarVisible.set(true);
	};

	return (
		<WelcomeContainer style={styles.container}>
			<Headline style={[styles.headline, { color: colors.text }]}>Recovery phrase</Headline>
			<Subheading style={[styles.subheading, { color: colors.placeholder }]}>
				Write this down on paper or save it in your password manager.
			</Subheading>

			<View style={styles.backupWordContainer}>
				{seed.value?.split(' ').map((word, index) => (
					<Text key={word} style={styles.backupWordItem}>
						<View
							style={[
								styles.backupWordNumberPadding,
								{ backgroundColor: scheme === 'dark' ? '' : '#FFF' }
							]}
						>
							<Text
								style={[styles.backupWordNumber, { color: scheme === 'dark' ? '#FFFFFF' : '#006AA6' }]}
							>
								{index + 1}
							</Text>
						</View>
						<View style={styles.backupWordPadding}>
							<Text style={{ color: colors.text }}>{word}</Text>
						</View>
					</Text>
				))}
			</View>

			<TouchableOpacity
				onPress={onCopyToClipboard}
				style={[
					styles.copyPasteButton,
					{ backgroundColor: scheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF' }
				]}
			>
				<MaterialIcons name="content-copy" size={16} color={colors.text} style={styles.imageCopyPaste} />
				<Text style={{ color: colors.text }}>Copy to clipboard</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={onFinish}>
				<Text style={{ color: colors.text }}>Done</Text>
			</TouchableOpacity>

			<Snackbar onDismiss={() => snackbarVisible.set(false)} visible={snackbarVisible.value}>
				Copied!
			</Snackbar>
		</WelcomeContainer>
	);
}
