import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from '@localization';
import Text from '../Text/Text';
import TransactionIcon from '../TransactionIcon/TransactionIcon';
import { styles } from './Transaction.styles';
import { TransactionProps } from './Transaction.types';
import { useTransaction } from './Transaction.hooks';

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
	const {
		received,
		title,
		value,
		token,
		failed,
		pending,
		openTransaction,
		topUp,
		subtitle,
		exchange,
		deposit,
		withdraw
	} = useTransaction({
		transaction
	});

	return (
		<TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={openTransaction}>
			<View style={[styles.leftContainer]}>
				<TransactionIcon {...{ received, failed, pending, topUp, exchange, deposit, withdraw }} />
				<View style={styles.titleContainer}>
					{failed ? (
						<Text type="span" color="alert1" weight="bold">
							{i18n.t('Transaction.failed')}
						</Text>
					) : (
						<Text type="span">{title}</Text>
					)}

					<Text type="p2" weight="regular" color="text1">
						{subtitle}
					</Text>
				</View>
			</View>
			<Text type="span">
				{value} {token}
			</Text>
		</TouchableOpacity>
	);
};

export default Transaction;
