import React from 'react';
import { useLanguage } from '@hooks';
import { countries, FlagType } from '@styles';
import View from '@src/components/View/View';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import Touchable from '@src/components/Touchable/Touchable';
import Flag from '../Flag/Flag';
import { CurrencySelectorProps, TitlesProps } from './CurrencySelector.types';

const NoTokenIcon = () => (
	<View
		round={40}
		bgc="background6"
		main="center"
		cross="center"
	>
		<Icon name="dollar" color="cta1" size={30} />
	</View>
);

const Titles: React.FC<TitlesProps> = ({ currency, notTouchable = false }) => {
	const { i18n } = useLanguage();
	return (
		<>
			<View row cross="center">
				<Text type="p2" weight="extraBold">
					{i18n.t(`LocationContext.${currency.country}.currencyName`, {
						defaultValue: currency.name
					})}
				</Text>
				<View mr="xxxs" />
				{!notTouchable && <Icon name="chevronDown" color="cta1" size={16} />}
			</View>
		</>
	);
};

const TitlesEmpty = () => {
	const { i18n } = useLanguage();
	return (
		<View row cross="center" h="100%">
			<Text type="p2" weight="medium">
				{i18n.t('Components.TokenCard.choose_currency')}
			</Text>
			<View mr="xxxs" />
			<Icon name="chevronDown" color="cta1" size={16} />
		</View>
	);
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ onPress, notTouchable, currency }) => (
	<Touchable onPress={onPress} opacity={notTouchable ? 1 : 0.6}>
		<View row mb="xs" cross="center">
			{currency ? <Flag size={28} name={countries[currency.country] as FlagType} /> : <NoTokenIcon />}

			<View
				row
				ml="xxs"
				main="space-between"
				cross="center"
				h="100%"
				flex1
			>
				{currency ? <Titles {...{ currency, notTouchable }} /> : <TitlesEmpty />}
			</View>
		</View>
	</Touchable>
);

export default CurrencySelector;
