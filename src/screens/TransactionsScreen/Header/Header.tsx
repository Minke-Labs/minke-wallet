import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useLanguage } from '@hooks';
import { Icon, Text } from '@components';
import styles from './Header.styles';

const Header = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
			</TouchableOpacity>
			<Text weight="extraBold" type="h3">
				{i18n.t('TransactionsScreen.Header.transactions')}
			</Text>
		</View>
	);
};

export default Header;
