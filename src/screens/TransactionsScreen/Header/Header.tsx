import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@hooks';
import { Icon, Text } from '@components';
import styles from './Header.styles';

const Header = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
			</TouchableOpacity>
			<Text weight="extraBold" type="h3">
				Transactions
			</Text>
		</View>
	);
};

export default Header;
