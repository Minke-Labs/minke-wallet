import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation, useLanguage } from '@hooks';
import { Text, Icon } from '@components';
import styles from './Header.styles';
import { HeaderProps } from './Header.types';

export const Header = ({ onHelpPress }: HeaderProps) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	return (
		<View style={styles.headerNavigation}>
			<TouchableOpacity style={styles.headerNavigationLeft} onPress={() => navigation.goBack()}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<Text weight="extraBold" style={{ marginLeft: 12 }}>
					{i18n.t('ReferralScreen.Header.points')}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onHelpPress}>
				<Icon name="infoStroke" color="text7" size={24} />
			</TouchableOpacity>
		</View>
	);
};
