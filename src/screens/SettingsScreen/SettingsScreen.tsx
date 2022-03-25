import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import { BasicLayout } from '@layouts';
import { Icon, Text } from '@components';
import { useTheme, useNavigation } from '@hooks';
import styles from './SettingsScreen.styles';
import SettingsOption from './SettingsOption';

const SettingsScreen = () => {
	const navigation = useNavigation();
	const onChangeNetwork = () => navigation.navigate('ChangeNetworkScreen');
	const onAccounts = () => navigation.navigate('AccountsScreen');
	const onTest = () => navigation.navigate('Test');
	const onContactSupport = () => Linking.openURL('mailto:support@minke.app');
	const onBackup = () => navigation.navigate('BackupSettingsScreen');
	const onDollarSettings = () => navigation.navigate('USDCoinScreen');
	const { colors } = useTheme();

	return (
		<BasicLayout>
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
					<SettingsOption label="US Dollar coin" icon="dollarStroke" onPress={onDollarSettings} />
					<SettingsOption label="Contact Support" icon="helpStroke" onPress={onContactSupport} />
					<View style={[styles.hr, { backgroundColor: colors.background2 }]} />
					<SettingsOption label="Switch account" onPress={onAccounts} icon="avatarStroke" />
					<SettingsOption label="Dev tests (please, dont use!)" onPress={onTest} icon="robotStroke" />
				</ScrollView>
			</View>
		</BasicLayout>
	);
};

export default SettingsScreen;
