import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { formatUnits } from 'ethers/lib/utils';
import { truncate } from '../Transaction.utils';
import Text from '../../Text/Text';
import TransactionIcon from './TransactionIcon/TransactionIcon';
import { CardProps } from './Card.types';
import { styles } from './styles';

const Card: React.FC<CardProps> = ({
	title,
	subtitle,
	received,
	token,
	value,
	tokenDecimal,
	tokenSymbol,
	failed,
	onPress,
	marginBottom = 32
}) => (
	<TouchableOpacity activeOpacity={0.6} style={[styles.container, { marginBottom }]} {...{ onPress }}>
		<View style={[styles.leftContainer, { opacity: failed ? 0.3 : 1 }]}>
			<TransactionIcon {...{ received }} failed />
			<View style={styles.titleContainer}>
				<Text type="span">{title}</Text>
				<Text type="p2" weight="medium">
					{subtitle}
				</Text>
			</View>
		</View>
		<Text type="span">
			{value && Math.trunc(Number(formatUnits(value, tokenDecimal))) > 0
				? truncate(formatUnits(value, tokenDecimal), 2)
				: truncate(formatUnits(value, tokenDecimal), 6)}{' '}
			{tokenSymbol || token}
		</Text>
	</TouchableOpacity>
);

export default Card;
