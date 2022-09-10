import React from 'react';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { Icon, ScreenLoadingIndicator, Text, Snackbar } from '@components';
import { useNavigation, useLanguage, useCountry } from '@hooks';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { getSeedPhrase } from '@models/wallet';
import * as Clipboard from 'expo-clipboard';
import RNUxcam from 'react-native-ux-cam';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
	if (seed.promised) return <ScreenLoadingIndicator />;

	const onCopyToClipboard = () => {
		Clipboard.setString(seed.value || '');
		setSnackbarVisible(true);
	};

	const onFinish = () => {
		if (country) navigation.navigate('HomeScreen');
		else navigation.navigate('ChangeCountryScreen');
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
							{i18n.t('ManualBackupScreen.done')}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.container}>
					<Text weight="extraBold" type="h3" mb="xxs">
						{i18n.t('ManualBackupScreen.recovery_phrase')}
					</Text>

					<Text color="text2" width={290} mb="l">
						{i18n.t('ManualBackupScreen.write_this_down')}
					</Text>

					<View ref={(view: any) => RNUxcam.occludeSensitiveView(view)}>
						<FlatList
							keyExtractor={(item, idx) => `${item}-${idx}`}
							data={seed.value?.split(' ')}
							renderItem={({ item, index }) => <Card title={item} idx={index + 1} />}
							numColumns={2}
							style={{ flexGrow: 0, marginBottom: 24 }}
						/>
					</View>

					<Warning />

					<CopyButton onPress={onCopyToClipboard} />
				</View>
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
