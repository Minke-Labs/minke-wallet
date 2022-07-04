import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, ScreenLoadingIndicator } from '@components';
import { useLanguage, useWalletState } from '@hooks';
import * as Haptics from 'expo-haptics';
import styles from './Header.styles';
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({ onSettingsPress, onCopyPress }) => {
	const { i18n } = useLanguage();
	const { accountName, state } = useWalletState();

	const handlePress = (event: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		onCopyPress(event);
	};

	if (state.promised) return <ScreenLoadingIndicator />;

	return (
		<View style={styles.container}>

			<TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
				<View style={styles.leftContainer}>
					<View>
						<Text type="a" weight="bold">
							{i18n.t('WalletScreen.Header.welcome')}
						</Text>
						<Text weight="extraBold" type="h3">
							{accountName}
						</Text>
					</View>
					<Icon
						name="copy"
						size={24}
						color="text7"
						style={styles.icon}
					/>
				</View>
			</TouchableOpacity>

			<View style={styles.iconsContainer}>
				<TouchableOpacity activeOpacity={0.6} onPress={onSettingsPress}>
					<Icon size={28} color="text7" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
