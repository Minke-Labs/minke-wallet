import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { View, Text, Icon, ScreenLoadingIndicator, Snackbar } from '@components';
import { useMinkeRewards, useNavigation, useWalletState } from '@hooks';

const Header: React.FC = () => {
	const navigation = useNavigation();
	const { points } = useMinkeRewards();
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const { accountName, state } = useWalletState();
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
			<View row main="space-between" cross="flex-end" mb={3}>
				<View>
					<Text type="lMedium" weight="semiBold">
						Welcome
					</Text>

					<TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
						<View row cross="center">
							<Text type="hMedium" weight="bold">
								{accountName}
							</Text>
							<View ml={3}>
								<Icon name="copy" size={24} color="text7" />
							</View>
						</View>
					</TouchableOpacity>

				</View>
				<View row cross="center">

					<TouchableOpacity activeOpacity={0.6} onPress={onPointsPress}>
						<View
							br={2}
							mr={2}
							ph={2}
							pv={1}
							row
							cross="center"
							bg="background3"
						>
							<Text weight="semiBold" type="lSmall" color="cta1">
								{points} points
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={onSettingsPress}>
						<Icon
							name="gear"
							size={28}
							color="cta1"
						/>
					</TouchableOpacity>
				</View>
			</View>
			<Snackbar
				onDismiss={() => setSnackbarVisible(false)}
				visible={snackbarVisible}
				title="Address copied"
			/>
		</>
	);
};

export default Header;
