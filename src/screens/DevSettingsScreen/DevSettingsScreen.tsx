import React from 'react';
import { Share, View } from 'react-native';
import { BasicLayout } from '@layouts';
import { Button, Header, Text } from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from '@hookstate/core';
import { getUniqueId } from 'react-native-device-info';
import { globalWalletState } from '@stores/WalletStore';

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

	return (
		<BasicLayout>
			<Header title="Dev settings" marginBottom={8} />
			<View style={{ padding: 32 }}>
				<Text marginBottom={16}>{address}</Text>
				<Text marginBottom={16}>Device ID: {deviceId}</Text>
				<Button title="Reset app tour" onPress={resetAppTour} marginBottom={16} />
				<Button title="Reset referral program" onPress={resetReferralProgram} marginBottom={16} />
				<Button title="Share debug data" onPress={shareDebugData} />
			</View>
		</BasicLayout>
	);
};

export default DevSettingsScreen;
