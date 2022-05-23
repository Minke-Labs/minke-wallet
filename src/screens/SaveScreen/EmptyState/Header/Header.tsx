import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@components';
import { useNavigation, useLanguage } from '@hooks';
import styles from './Header.styles';

export const Header = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	return (
		<View style={styles.headerNavigation}>
			<TouchableOpacity style={styles.headerNavigationLeft} onPress={() => navigation.goBack()}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<Text weight="extraBold" type="h3" color="text1" style={{ marginLeft: 12 }}>
					{i18n.t('SaveScreen.EmptyState.save')}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
