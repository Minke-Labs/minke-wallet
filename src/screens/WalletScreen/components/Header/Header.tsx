import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, ScreenLoadingIndicator } from '@components';
import i18n from '@localization';
import styles from './Header.styles';
import { HeaderProps } from './Header.types';
import { useHeader } from './Header.hooks';

const Header: React.FC<HeaderProps> = ({ onSettingsPress }) => {
	const { accountName, state } = useHeader();

	if (state.promised) return <ScreenLoadingIndicator />;

	return (
		<View style={styles.headerContainer}>
			<View>
				<Text type="a" weight="bold">
					{i18n.t('WalletScreen.Header.welcome')}
				</Text>
				<Text weight="extraBold" type="h3">
					{accountName()}
				</Text>
			</View>
			<View style={styles.iconsContainer}>
				{/* <TouchableOpacity activeOpacity={0.6}>
					<Icon name="walletConnectStroke" style={{ marginRight: 21 }} size={20} color="text7" />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6}>
					<Icon name="waveStroke" style={{ marginRight: 21 }} size={20} color="text7" />
				</TouchableOpacity> */}
				<TouchableOpacity activeOpacity={0.6} onPress={onSettingsPress}>
					<Icon size={20} color="text7" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
