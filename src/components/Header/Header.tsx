import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@hooks';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import styles from './Header.styles';

interface HeaderProps {
	title: string;
	marginBottom?: number;
}

const Header: React.FC<HeaderProps> = ({ title, marginBottom = 0 }) => {
	const navigation = useNavigation();
	return (
		<View style={[styles.container, { marginBottom }]}>
			<Touchable
				onPress={() => navigation.goBack()}
				style={styles.row}
			>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<Text type="hSmall" weight="extraBold" style={styles.title}>
					{title}
				</Text>
			</Touchable>
		</View>
	);
};

export default Header;
