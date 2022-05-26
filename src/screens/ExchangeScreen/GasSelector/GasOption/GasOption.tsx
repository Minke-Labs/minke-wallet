import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@components';
import { tokenBalanceFormat } from '@helpers/utilities';
import { useLanguage, useTheme } from '@hooks';
import Radio from './Radio/Radio';
import { makeStyles } from './GasOption.styles';
import { GasOptionProps } from './GasOption.types';

const GasOption: React.FC<GasOptionProps> = ({
	type,
	disabled = false,
	onSelectGas,
	selected,
	gasPrice,
	usdPrice,
	waiting
}) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<TouchableOpacity onPress={onSelectGas} disabled={disabled} activeOpacity={0.6}>
			<View style={[styles.container, selected ? styles.selectedCard : {}]}>
				<View style={styles.content}>

					<Radio selected={selected} />

					<View style={styles.icon}>
						<Icon
							name={type === 'fast' ? 'boltStroke' : 'clockStroke'}
							size={20}
							color="cta1"
						/>
					</View>

					<View style={{ marginRight: 16, flex: 1 }}>
						<Text type="span" weight="bold">
							{i18n.t(`ExchangeScreen.GasSelector.GasOption.${type}`)}
						</Text>
						<Text type="span">{waiting()}</Text>
					</View>

					<View style={{ alignItems: 'flex-end', flex: 1 }}>
						<Text type="span" weight="bold">
							${tokenBalanceFormat(gasPrice * 41000 * 10 ** -9 * usdPrice, 5)}
						</Text>
						<Text type="span">
							{i18n.t('ExchangeScreen.GasSelector.GasOption.transaction_fee')}
						</Text>
					</View>

				</View>
			</View>
		</TouchableOpacity>
	);
};

export default GasOption;
