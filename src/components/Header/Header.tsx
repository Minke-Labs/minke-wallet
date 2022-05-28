import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@hooks';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import styles from './Header.styles';

interface HeaderProps {
	title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
	const navigation = useNavigation();
	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>

			<View style={styles.title}>
				<Text type="hSmall" weight="extraBold">
					{title}
				</Text>
			</View>
		</>
	);
};

export default Header;
