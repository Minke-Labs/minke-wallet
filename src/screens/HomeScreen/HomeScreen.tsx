import React, { useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { BasicLayout } from '@layouts';
import { Snackbar } from 'react-native-paper';
import { View, Modal, ModalReusables, Text } from '@components';
import { useMinkeRewards, useNavigation, useWalletState } from '@hooks';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Selector } from './Selector/Selector';
import { Stories } from './Stories/Stories';
import { Accounts } from './Accounts/Accounts';
import { Assets } from './Assets/Assets';
import Header from './Header/Header';

const HomeScreen = () => {
	const [visible, setVisible] = useState(false);
	const [snackbarVisible, setSnackbarVisible] = useState(false);

	const { state } = useWalletState();
	const { address } = state.value;
	const { points } = useMinkeRewards();
	const navigation = useNavigation();

	const onPointsPress = () => navigation.navigate('ReferralScreen');
	const onSettingsPress = () => navigation.navigate('SettingsScreen');
	const onCopyToClipboard = () => {
		Clipboard.setString(address || '');
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSnackbarVisible(true);
	};

	return (
		<>
			<BasicLayout>
				<SafeAreaView />
				<ScrollView showsVerticalScrollIndicator={false}>
					<View ph={3}>
						<Header
							onPointsPress={onPointsPress}
							onSettingsPress={onSettingsPress}
							onCopyPress={onCopyToClipboard}
							points={points}
						/>
						<Assets />
						<Accounts />
						<Stories />
					</View>
				</ScrollView>
				<Selector onActionPressed={() => setVisible(true)} />
			</BasicLayout>

			<Modal isVisible={visible} onDismiss={() => setVisible(false)}>
				<ModalReusables.Actions />
			</Modal>

			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text color="text11">
					Address copied
				</Text>
			</Snackbar>
		</>
	);
};

export default HomeScreen;
