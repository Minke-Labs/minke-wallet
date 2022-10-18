import React from 'react';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { View, Text, Icon, ScreenLoadingIndicator, Snackbar, Touchable } from '@components';
import { useLanguage, useMinkeRewards, useNavigation, useWalletState } from '@hooks';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

const Header: React.FC = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { points } = useMinkeRewards();
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const { accountName } = useWalletState();
	const state = useState(globalWalletState());
	const { address } = state.value;

	const onPointsPress = () => navigation.navigate('ReferralScreen');
	const onSettingsPress = () => navigation.navigate('SettingsScreen');
	const onCopyToClipboard = () => {
		Clipboard.setString(address || '');
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSnackbarVisible(true);
	};

	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		onCopyToClipboard();
	};

	if (state.promised) return <ScreenLoadingIndicator />;

	return (
		<>
			<View row main="space-between" cross="flex-end" mb="xs">
				<View style={{ maxWidth: 240 }}>
					<Text type="lMedium" weight="semiBold">
						{i18n.t('HomeScreen.Header.welcome')}
					</Text>
					<Touchable onPress={handlePress}>
						<View row cross="center">
							<Text type="hMedium" weight="bold" numberOfLines={1}>
								{accountName}
							</Text>
							<View ml="xxs">
								<Icon name="copy" size={24} color="text7" />
							</View>
						</View>
					</Touchable>
				</View>
				<View row cross="center" pb="xxxs">
					<Touchable
						onPress={onPointsPress}
						br="xxs"
						mr="xxs"
						ph="xxs"
						pv="xxxs"
						row
						cross="center"
						bgc="background3"
					>
						<Text weight="semiBold" type="lSmall" color="cta1">
							{points > 0
								? `${points} ${i18n.t('HomeScreen.Header.points')}`
								: i18n.t('HomeScreen.Header.invite_a_friend')}
						</Text>
					</Touchable>
					<Touchable onPress={onSettingsPress}>
						<Icon name="gear" size={28} color="cta1" />
					</Touchable>
				</View>
			</View>

			<Snackbar
				onDismiss={() => setSnackbarVisible(false)}
				visible={snackbarVisible}
				title={i18n.t('Components.Snackbar.address_copied')}
			/>
		</>
	);
};

export default Header;
