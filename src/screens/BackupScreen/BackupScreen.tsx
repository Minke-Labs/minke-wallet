import React from 'react';
import { useState } from '@hookstate/core';
import { WelcomeLayout } from '@layouts';
import { Icon, Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { getSeedPhrase } from '@models/wallet';
import AppLoading from 'expo-app-loading';
import { globalWalletState } from '@stores/WalletStore';
import * as Clipboard from 'expo-clipboard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Snackbar } from 'react-native-paper';
import Card from './Card';
import CopyButton from './CopyButton';
import styles from './BackupScreen.styles';
import { RootStackParamList } from '../../routes/types.routes';

const BackupScreen = () => {
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const onFinish = () => navigation.navigate('Wallet');
	const walletState = useState(globalWalletState());
	const loadSeed = getSeedPhrase(walletState.value.walletId || '');
	const seed = useState(loadSeed);
	if (seed.promised) return <AppLoading />;

	const onCopyToClipboard = () => {
		Clipboard.setString(seed.value || '');
		setSnackbarVisible(true);
	};

	return (
		<>
			<WelcomeLayout>
				<View style={styles.headerContainer}>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" size={24} color="text7" />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} onPress={onFinish}>
						<Text weight="medium" type="a" color="text7">
							Done
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.container}>
					<Text weight="extraBold" type="h3" marginBottom={8}>
						Recovery phrase
					</Text>

					<Text color="text2" width={290} marginBottom={40}>
						Write this down on paper or save it in your password manager.
					</Text>

					<FlatList
						keyExtractor={(item, idx) => `${item}-${idx}`}
						data={seed.value?.split(' ')}
						renderItem={({ item, index }) => <Card title={item} idx={index} />}
						numColumns={2}
						style={{ flexGrow: 0, marginBottom: 24 }}
					/>

					<CopyButton onPress={onCopyToClipboard} />
				</View>
			</WelcomeLayout>
			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text style={{ color: '#FFFFFF' }}>Address copied!</Text>
			</Snackbar>
		</>
	);
};

export default BackupScreen;
