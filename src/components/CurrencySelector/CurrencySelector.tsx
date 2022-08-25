import React from 'react';
import { View } from 'react-native';
import { useLanguage, useTheme } from '@hooks';
import { countries, FlagType } from '@styles';
import { Currency } from '@models/types/currency.types';
import styles from './CurrencySelector.styles';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Flag from '../Flag/Flag';
import Touchable from '../Touchable/Touchable';
import { CurrencySelectorProps } from './CurrencySelector.types';

const NoTokenIcon = () => {
	const { colors } = useTheme();
	return (
		<View style={[styles.noTokenIcon, { backgroundColor: colors.background6 }]}>
			<Icon name="dollar" color="cta1" size={30} />
		</View>
	);
};

interface TitlesProps {
	currency: Currency;
	notTouchable?: boolean;
}

const Titles: React.FC<TitlesProps> = ({ currency, notTouchable = false }) => {
	const { i18n } = useLanguage();
	return (
		<>
			<View style={styles.titlesUpper}>
				<Text type="p2" style={{ marginRight: 4 }} weight="extraBold">
					{i18n.t(`LocationContext.${currency.country}.currencyName`, {
						defaultValue: currency.name
					})}
				</Text>
				{!notTouchable && <Icon name="chevronDown" color="cta1" size={16} />}
			</View>
		</>
	);
};

const TitlesEmpty = () => {
	const { i18n } = useLanguage();
	return (
		<View
			style={{
				height: '100%',
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Text type="p2" weight="medium" style={{ marginRight: 4 }}>
				{i18n.t('Components.TokenCard.choose_currency')}
			</Text>
			<Icon name="chevronDown" color="cta1" size={16} />
		</View>
	);
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ onPress, notTouchable, currency }) => (
	<Touchable onPress={onPress} opacity={notTouchable ? 1 : 0.6}>
		<View style={styles.container}>
			{currency ? <Flag size={28} name={countries[currency.country] as FlagType} /> : <NoTokenIcon />}

			<View style={styles.titlesContainer}>
				{currency ? <Titles {...{ currency, notTouchable }} /> : <TitlesEmpty />}
			</View>
		</View>
	</Touchable>
);

export default CurrencySelector;
