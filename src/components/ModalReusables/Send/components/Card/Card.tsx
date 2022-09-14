import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TokenType } from '@styles';
import Text from '@src/components/Text/Text';
import Token from '@src/components/Token/Token';
import { tokenBalanceFormat } from '@helpers/utilities';
import { useLanguage } from '@hooks';
import { CardProps } from './Card.types';
import styles from './Card.styles';

const Card: React.FC<CardProps> = ({ token, onSelected }) => {
	const { i18n } = useLanguage();
	return (
		<TouchableOpacity
			{...(onSelected && { onPress: () => onSelected(token) })}
			{...(!onSelected && { activeOpacity: 1 })}
			style={styles.container}
		>
			<Token name={token.symbol.toLowerCase() as TokenType} size={40} />
			<View style={styles.titleContainer}>
				<Text weight="bold" type="p2">
					{token.name}
				</Text>
				<Text type="span" weight="bold">
					${tokenBalanceFormat(token.balanceUSD!, 2)} ({tokenBalanceFormat(token.balance!, 9)} {token.symbol})
					<Text weight="regular" type="span">
						{i18n.t('Components.ModalReusables.SendModal.components.Card.available')}
					</Text>
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Card;
