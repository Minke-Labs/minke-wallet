import React from 'react';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { Icon, ScreenLoadingIndicator, Text } from '@components';
import { useNavigation } from '@hooks';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { getSeedPhrase } from '@models/wallet';
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import Card from './Card/Card';
import CopyButton from './CopyButton/CopyButton';
import styles from './ManualBackupScreen.styles';
import Warning from './Warning/Warning';

type Props = NativeStackScreenProps<RootStackParamList, 'BackupToICloudScreen'>;
const ManualBackupScreen = ({ route }: Props) => {
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const navigation = useNavigation();
	const onFinish = () => navigation.navigate('WalletScreen');
	const { walletId } = route.params;
	const loadSeed = getSeedPhrase(walletId!);
	const seed = useState(loadSeed);
	if (seed.promised) return <ScreenLoadingIndicator />;

	const onCopyToClipboard = () => {
		Clipboard.setString(seed.value || '');
		setSnackbarVisible(true);
	};

	return (
		<>
			<BasicLayout>
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
						renderItem={({ item, index }) => <Card title={item} idx={index + 1} />}
						numColumns={2}
						style={{ flexGrow: 0, marginBottom: 24 }}
					/>

					<Warning />

					<CopyButton onPress={onCopyToClipboard} />
				</View>
			</BasicLayout>
			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text style={{ color: '#FFFFFF' }}>Address copied!</Text>
			</Snackbar>
		</>
	);
};

export default ManualBackupScreen;
