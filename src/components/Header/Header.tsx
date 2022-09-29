import React from 'react';
import { useLanguage, useNavigation } from '@hooks';
import Icon from '@src/components/Icon/Icon';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Touchable from '@src/components/Touchable/Touchable';
import { SpacingType } from '@styles';

interface HeaderProps {
	title: string;
	marginBottom?: SpacingType;
	done?: boolean;
	rightAction?: string | JSX.Element;
	onRightActionClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
	title,
	onRightActionClick,
	marginBottom = 'zero',
	rightAction = '',
	done = false
}) => {
	const navigation = useNavigation();
	const { i18n } = useLanguage();
	const rightButton = done || !!rightAction;

	return (
		<View h={48} ph="xs" row main="space-between" cross="center" mb={marginBottom}>
			<View row>
				<Touchable row cross="center" onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
					<View mr="xxs" />
					<Text type="hSmall" weight="bold">
						{title}
					</Text>
				</Touchable>
			</View>
			{rightButton && (
				<Touchable onPress={onRightActionClick || (() => navigation.navigate('HomeScreen'))}>
					<Text weight="semiBold" color="cta1" type="lMedium">
						{done ? i18n.t('Components.Header.done') : rightAction}
					</Text>
				</Touchable>
			)}
		</View>
	);
};

export default Header;
