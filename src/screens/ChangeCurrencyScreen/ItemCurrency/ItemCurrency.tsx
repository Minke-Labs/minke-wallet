import React from 'react';
import { View } from 'react-native';
import { Flag, Text, Icon } from '@components';
import { useTheme } from '@hooks';
import styles from './ItemCurrency.styles';
import { ItemCurrencyProps } from './ItemCurrency.types';

export const ItemCurrency: React.FC<ItemCurrencyProps> = ({ flag, currencyName }) => {
	const { colors } = useTheme();

	return (
		<View style={{ paddingHorizontal: 16 }}>
			<View style={[styles.container, { borderColor: colors.text11 }]}>
				<View style={styles.leftContainer}>
					<Flag size={40} name={flag} />
					<Text style={{ marginLeft: 12 }} weight="bold" type="p2">
						{currencyName}
					</Text>
				</View>
				<Icon size={24} name="checkColor" />
			</View>
		</View>
	);
};
