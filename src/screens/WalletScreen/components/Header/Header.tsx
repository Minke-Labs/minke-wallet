import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, ScreenLoadingIndicator } from '@components';
import { useLanguage } from '@hooks';
import styles from './Header.styles';
import { HeaderProps } from './Header.types';
import { useHeader } from './Header.hooks';

const Header: React.FC<HeaderProps> = ({ onSettingsPress, onCopyPress }) => {
	const { i18n } = useLanguage();
	const { accountName, state } = useHeader();

	if (state.promised) return <ScreenLoadingIndicator />;

	return (
		<View style={styles.headerContainer}>
			<View style={styles.leftContainer}>
				<View>
					<Text type="a" weight="bold">
						{i18n.t('WalletScreen.Header.welcome')}
					</Text>
					<Text weight="extraBold" type="h3">
						{accountName()}
					</Text>
				</View>

				<TouchableOpacity activeOpacity={0.6} onPress={onCopyPress}>
					<Icon
						name="copy"
						size={24}
						color="text7"
						style={styles.icon}
					/>
				</TouchableOpacity>
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
