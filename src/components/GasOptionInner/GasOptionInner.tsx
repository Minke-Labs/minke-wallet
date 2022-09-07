import { View } from 'react-native';
import React from 'react';
import { useLanguage, useTheme } from '@hooks';
import { tokenBalanceFormat } from '@helpers/utilities';
import { makeStyles } from './GasOptionInner.styles';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

interface GasOptionInnerProps {
	type: 'normal' | 'fast' | 'slow';
	gasPrice: number;
	usdPrice: number;
	waiting: string | null;
}

const GasOptionInner: React.FC<GasOptionInnerProps> = ({ type, waiting, gasPrice, usdPrice }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<>
			<View style={styles.icon}>
				<Icon name={type === 'fast' ? 'boltStroke' : 'clockStroke'} size={20} color="cta1" />
			</View>

			<View style={{ marginRight: 16, flex: 1 }}>
				<Text type="span" weight="bold">
					{i18n.t(`ExchangeScreen.GasSelector.GasOption.${type}`)}
				</Text>
				<Text type="span">{waiting}</Text>
			</View>

			<View style={{ alignItems: 'flex-end', flex: 1 }}>
				<Text type="span" weight="bold">
					${tokenBalanceFormat(gasPrice * 41000 * 10 ** -9 * usdPrice, 5)}{' '}
					{/* @TODO: receive the transaction gas cost */}
				</Text>
				<Text type="span">{i18n.t('ExchangeScreen.GasSelector.GasOption.transaction_fee')}</Text>
			</View>
		</>
	);
};

export default GasOptionInner;
