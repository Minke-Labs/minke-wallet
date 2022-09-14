import React from 'react';
import { useNavigation } from '@hooks';
import Icon from '@src/components/Icon/Icon';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Touchable from '@src/components/Touchable/Touchable';

interface HeaderProps {
	title: string;
	marginBottom?: number;
}

const Header: React.FC<HeaderProps> = ({ title, marginBottom = 0 }) => {
	const navigation = useNavigation();
	return (
		<View
			mb="xxs"
			ph="xs"
			row
			cross="center"
			style={{ marginBottom }}
			w="100%"
		>
			<Touchable
				row
				main="space-between"
				cross="center"
				onPress={() => navigation.goBack()}
			>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<View mr="xxs" />
				<Text type="hSmall" weight="extraBold">
					{title}
				</Text>
			</Touchable>
		</View>
	);
};

export default Header;
