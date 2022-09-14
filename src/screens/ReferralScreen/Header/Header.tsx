import React from 'react';
import { useNavigation, useLanguage } from '@hooks';
import { Text, Icon, View, Touchable } from '@components';
import { HeaderProps } from './Header.types';

export const Header = ({ onHelpPress }: HeaderProps) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	return (
		<View row main="space-between" cross="center">
			<Touchable row onPress={() => navigation.goBack()}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<View mr="xxs" />
				<Text weight="extraBold">
					{i18n.t('ReferralScreen.Header.points')}
				</Text>
			</Touchable>
			<Touchable onPress={onHelpPress}>
				<Icon name="infoStroke" color="text7" size={24} />
			</Touchable>
		</View>
	);
};
