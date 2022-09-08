import React from 'react';
import { useLanguage, useNavigation } from '@hooks';
import Icon from '@src/components/Icon/Icon';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Touchable from '@src/components/Touchable/Touchable';
import { SettingsHeaderProps } from './SettingsHeader.types';

// @@@TODO: ALL HEADERS WILL BECOME ONE
const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onPress, done = true, title }) => {
	const navigation = useNavigation();
	const { i18n } = useLanguage();

	const goBack = () => navigation.goBack();

	return (
		<View
			h={48}
			ph="xs"
			row
			main="space-between"
			cross="center"
		>
			<View row>
				<Touchable row cross="center" onPress={goBack}>
					<Icon
						name="arrowBackStroke"
						color="text7"
						size={24}
					/>
					<View mr="xxs" />
					<Text type="hSmall" weight="bold">
						{title}
					</Text>
				</Touchable>
			</View>
			{done && (
				<Touchable {...{ onPress }}>
					<Text
						weight="semiBold"
						color="cta1"
						type="lMedium"
					>
						{i18n.t('Components.SettingsHeader.done')}
					</Text>
				</Touchable>
			)}
		</View>
	);
};

export default SettingsHeader;
