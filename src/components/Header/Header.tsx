import React from 'react';
import { useNavigation } from '@hooks';
import Icon from '@src/components/Icon/Icon';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Touchable from '@src/components/Touchable/Touchable';
import { SpacingType } from '@styles';

interface HeaderProps {
	title: string;
	mb?: SpacingType;
	link?: string;
	onLinkClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, link, onLinkClick, mb }) => {
	const navigation = useNavigation();
	return (
		<View
			ph="xs"
			row
			main="space-between"
			cross="center"
			mb={mb || 'xxs'}
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
			{!!link && (
				<Touchable onPress={onLinkClick}>
					<Text type="lMedium" color="cta1" weight="semiBold">
						{link}
					</Text>
				</Touchable>
			)}
		</View>
	);
};

export default Header;
