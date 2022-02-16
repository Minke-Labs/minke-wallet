import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { WelcomeLayout } from '@layouts';
import { Icon, Text } from '@components';
import { useTheme } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import styles from './SettingsScreen.styles';
import { RootStackParamList } from '../../routes/types.routes';
import SettingsOption from './SettingsOption';

const SettingsScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const onChangeNetwork = () => navigation.navigate('ChangeNetwork');
	const onAccounts = () => navigation.navigate('Accounts');
	const onContactSupport = () => Linking.openURL('mailto:support@minke.app');
	const onBackup = () => navigation.navigate('BackupSettings');
	const { colors } = useTheme();

	return (
		<WelcomeLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} style={{ width: 24 }} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<Text type="h3" weight="extraBold" marginBottom={40}>
					Settings
				</Text>

				<ScrollView>
					<SettingsOption label="Backup" icon="backupStroke" onPress={onBackup} />
					<SettingsOption label="Network" icon="networkStroke" onPress={onChangeNetwork} />
					<SettingsOption label="Contact Support" icon="helpStroke" onPress={onContactSupport} />
					<View style={[styles.hr, { backgroundColor: colors.background2 }]} />
					<SettingsOption label="Switch account" onPress={onAccounts} icon="avatarStroke" />
				</ScrollView>
			</View>
		</WelcomeLayout>
	);
};

export default SettingsScreen;
