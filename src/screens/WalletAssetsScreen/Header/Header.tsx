import React from 'react';
import { Icon, Text } from '@components';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@hooks';
import i18n from '@localization';
import { HeaderProps } from './Header.types';
import styles from './Header.styles';

const Header: React.FC<HeaderProps> = ({ title = i18n.t('WalletAssetsScreen.header') }) => {
	const navigation = useNavigation();

	return (
		<View>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" size={24} color="text7" style={{ marginRight: 12 }} />
					</TouchableOpacity>
					<Text type="h3" weight="extraBold">
						{title}
					</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
					<Icon size={24} color="text7" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
