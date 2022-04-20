import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { formatUnits } from 'ethers/lib/utils';
import Text from '../Text/Text';
import TransactionIcon from './TransactionIcon/TransactionIcon';
import { CardTransactionProps } from './CardTransaction.types';
import { styles } from './CardTransaction.styles';

const truncate = (num: number | string, idx = 2) => +num.toString().slice(0, num.toString().indexOf('.') + (idx + 1));

const CardTransaction: React.FC<CardTransactionProps> = ({
	title,
	subtitle,
	token,
	value,
	tokenDecimal,
	tokenSymbol,
	received = false,
	failed = false,
	pending = false,
	topUp = false,
	onPress,
	marginBottom = 32
}) => (
	<TouchableOpacity activeOpacity={0.6} style={[styles.container, { marginBottom }]} {...{ onPress }}>
		<View style={[styles.leftContainer]}>
			<TransactionIcon {...{ received, failed, pending, topUp }} />
			<View style={styles.titleContainer}>
				{!failed && !pending && <Text type="span">{title}</Text>}

				{failed && (
					<Text type="span" color="alert1" weight="bold">
						Failed
					</Text>
				)}

				{pending && !failed && (
					<Text type="span" color="text3" weight="bold">
						Pending
					</Text>
				)}

				<Text type="p2" weight="medium" color="text4">
					{subtitle}
				</Text>
			</View>
		</View>
		{!pending ? (
			<Text type="span">
				{value && Math.trunc(Number(formatUnits(value, tokenDecimal))) > 0
					? truncate(formatUnits(value, tokenDecimal), 2)
					: truncate(formatUnits(value, tokenDecimal), 6)}{' '}
				{tokenSymbol || token}
			</Text>
		) : (
			<Text type="span">
				{value} {tokenSymbol}
			</Text>
		)}
	</TouchableOpacity>
);

export default CardTransaction;
