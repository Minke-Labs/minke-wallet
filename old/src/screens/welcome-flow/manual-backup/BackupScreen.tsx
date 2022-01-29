import React, { useCallback } from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Headline, Subheading, Snackbar, useTheme, Portal } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { globalWalletState } from 'old/src/stores/WalletStore';
import { RootStackParamList } from 'old/src/helpers/param-list-type';
import { getSeedPhrase } from 'old/src/model/wallet';
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
			<View style={styles.headerNavegation}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<MaterialIcons
						name="arrow-back-ios"
						size={16}
						color={scheme === 'dark' ? '#FFF' : colors.primary}
						style={styles.contentCopy}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={onFinish}>
					<Text style={{ color: scheme === 'dark' ? '#FFF' : colors.primary }}>Done</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.backupWordContainer}>
				<Headline style={[styles.headline, { color: colors.text }]}>Recovery phrase</Headline>
				<Subheading style={[styles.subheading, { color: colors.secondaryText }]}>
					Write this down on paper or save it in your password manager.
				</Subheading>

				{seed.value?.split(' ').map((word, index) => (
					<View key={word} style={styles.backupWordItem}>
						<View
							style={[
								styles.backupWordNumberPadding,
								{ backgroundColor: scheme === 'dark' ? '' : '#FFF' }
							]}
						>
							<Text style={[styles.backupWordNumber, { color: colors.primary }]}>{index + 1}</Text>
						</View>
						<View style={styles.backupWordPadding}>
							<Text style={{ color: colors.text }}>{word}</Text>
						</View>
					</View>
				))}
				<TouchableOpacity
					onPress={onCopyToClipboard}
					style={[
						styles.copyPasteButton,
						{ backgroundColor: scheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF' }
					]}
				>
					<MaterialIcons name="content-copy" size={16} color={colors.text} style={styles.contentCopy} />
					<Text style={{ color: colors.text }}>Copy to clipboard</Text>
				</TouchableOpacity>
				<Portal>
					<Snackbar
						onDismiss={() => snackbarVisible.set(false)}
						visible={snackbarVisible.value}
						style={styles.snackbar}
						duration={3000}
					>
						Copied!
					</Snackbar>
				</Portal>
			</View>
		</WelcomeContainer>
	);
}
