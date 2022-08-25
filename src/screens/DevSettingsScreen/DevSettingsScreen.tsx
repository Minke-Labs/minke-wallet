import React from 'react';
import { Alert, Share } from 'react-native';
import { BasicLayout } from '@layouts';
import { Button, Header, Text, View } from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from '@hookstate/core';
import { getUniqueId } from 'react-native-device-info';
import { globalWalletState } from '@stores/WalletStore';
import { deleteAllBackups } from '@models/cloudBackup';

const DevSettingsScreen = () => {
	const { address } = useState(globalWalletState()).value;
	const resetAppTour = async () => {
		await AsyncStorage.removeItem('isFirstTimeLoaded?');
	};

	const resetReferralProgram = async () => {
		await AsyncStorage.removeItem(`@referral_code-${address}`);
		await AsyncStorage.removeItem('@referralCodeInUse');
	};

	const deviceId = getUniqueId();

	const shareDebugData = async () => {
		const walletReferralCode = await AsyncStorage.getItem(`@referral_code-${address}`);
		const referralCodeInUse = await AsyncStorage.getItem('@referralCodeInUse');
		await Share.share({
			// eslint-disable-next-line max-len
			message: `Address: ${address} Device ID: ${deviceId} Wallet referral code: ${walletReferralCode} Referral code in use: ${referralCodeInUse}`
		});
	};

	const deleteBackups = async () => {
		Alert.alert('Are you sure?', '', [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'OK',
				onPress: async () => {
					await deleteAllBackups();
				}
			}
		]);
	};

	return (
		<BasicLayout>
			<Header title="Dev settings" marginBottom={8} />
			<View p="m">
				<Text mb="xs">{address}</Text>
				<Text mb="xs">Device ID: {deviceId}</Text>
				<Button title="Reset app tour" onPress={resetAppTour} mb="xs" />
				<Button title="Reset referral program" onPress={resetReferralProgram} mb="xs" />
				<Button title="Delete all cloud backups" onPress={deleteBackups} mb="xs" />
				<Button title="Share debug data" onPress={shareDebugData} />
			</View>
		</BasicLayout>
	);
};

export default DevSettingsScreen;
