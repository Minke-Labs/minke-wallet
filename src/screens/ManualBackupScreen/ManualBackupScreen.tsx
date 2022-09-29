import React from 'react';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { ScreenLoadingIndicator, Text, Snackbar, Header, Button, View } from '@components';
import { useNavigation, useLanguage, useCountry, useWallets } from '@hooks';
import { View as RNView, FlatList, ScrollView } from 'react-native';
import { getSeedPhrase, MinkeWallet } from '@models/wallet';
import * as Clipboard from 'expo-clipboard';
import RNUxcam from 'react-native-ux-cam';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { globalWalletState, walletState } from '@stores/WalletStore';
import { RootStackParamList } from '@src/routes/types.routes';
import Card from './Card/Card';
import CopyButton from './CopyButton/CopyButton';
import Warning from './Warning/Warning';
import styles from './ManualBackupScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'BackupToICloudScreen'>;
const ManualBackupScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('ManualBackupScreen');
	const { i18n } = useLanguage();
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const navigation = useNavigation();
	const { walletId } = route.params;
	const loadSeed = getSeedPhrase(walletId!);
	const seed = useState(loadSeed);
	const { country } = useCountry();
	const state = useState(globalWalletState());
	const { wallets } = useWallets();
	if (seed.promised) return <ScreenLoadingIndicator />;

	const onCopyToClipboard = () => {
		Clipboard.setString(seed.value || '');
		setSnackbarVisible(true);
	};

	const onFinish = () => {
		if (country) navigation.navigate('HomeScreen');
		else navigation.navigate('ChangeCountryScreen');
	};

	const goToWallet = async () => {
		const wallet: MinkeWallet = wallets[walletId!];
		state.set(await walletState(wallet));
		onFinish();
	};

	return (
		<>
			<BasicLayout>
				<Header
					title={i18n.t('ManualBackupScreen.recovery_phrase')}
					marginBottom="xs"
					done
					onRightActionClick={onFinish}
				/>
				<ScrollView
					contentContainerStyle={{
						alignItems: 'center'
					}}
				>
					<RNView style={styles.container}>
						<Text color="text2" width={290} mb="l">
							{i18n.t('ManualBackupScreen.write_this_down')}
						</Text>

						<RNView ref={(view: any) => RNUxcam.occludeSensitiveView(view)}>
							<FlatList
								keyExtractor={(item, idx) => `${item}-${idx}`}
								data={seed.value?.split(' ')}
								renderItem={({ item, index }) => <Card title={item} idx={index + 1} />}
								numColumns={2}
								style={{ flexGrow: 0, marginBottom: 24 }}
							/>
						</RNView>

						<Warning />

						<View mb="xxs">
							<CopyButton onPress={onCopyToClipboard} />
						</View>
						<Button title={i18n.t('ManualBackupScreen.go_to_wallet')} onPress={goToWallet} />
					</RNView>
				</ScrollView>
			</BasicLayout>
			<Snackbar
				onDismiss={() => setSnackbarVisible(false)}
				visible={snackbarVisible}
				title={i18n.t('Components.Snackbar.address_copied')}
			/>
		</>
	);
};

export default ManualBackupScreen;
