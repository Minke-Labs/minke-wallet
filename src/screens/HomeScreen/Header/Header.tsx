import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { View, Text, Icon, ScreenLoadingIndicator } from '@components';
import { useWalletState } from '@hooks';

interface HeaderProps {
	onPointsPress: () => void;
	onSettingsPress: () => void;
	onCopyPress: (event: GestureResponderEvent) => void;
	points: number;
}

const Header: React.FC<HeaderProps> = ({ onPointsPress, onSettingsPress, onCopyPress, points }) => {
	const { accountName, state } = useWalletState();

	const handlePress = (event: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		onCopyPress(event);
	};

	if (state.promised) return <ScreenLoadingIndicator />;

	return (
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
	);
};

export default Header;
