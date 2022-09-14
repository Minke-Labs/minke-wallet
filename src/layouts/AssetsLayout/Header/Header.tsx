import React from 'react';
import { Icon, Text, Touchable } from '@components';
import { View } from 'react-native';
import { useNavigation } from '@hooks';
import { HeaderProps } from './Header.types';
import styles from './Header.styles';

const Header: React.FC<HeaderProps> = ({ title }) => {
	const navigation = useNavigation();

	return (
		<View>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Touchable onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" size={24} color="text7" style={{ marginRight: 12 }} />
					</Touchable>
					<Text type="h3" weight="extraBold">
						{title}
					</Text>
				</View>
				<Touchable onPress={() => navigation.navigate('SettingsScreen')}>
					<Icon size={24} color="text7" />
				</Touchable>
			</View>
		</View>
	);
};

export default Header;
