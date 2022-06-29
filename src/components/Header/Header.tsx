import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@hooks';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import styles from './Header.styles';

interface HeaderProps {
	title: string;
	marginBottom?: number;
}

const Header: React.FC<HeaderProps> = ({ title, marginBottom = 0 }) => {
	const navigation = useNavigation();
	return (
		<View style={[styles.container, { marginBottom }]}>
			<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={styles.title}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<Text type="hSmall" weight="extraBold">
					{title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Header;
