import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useLanguage, useNavigation, useTransaction } from '@hooks';
import Text from '../Text/Text';
import TransactionIcon from '../TransactionIcon/TransactionIcon';
import { styles } from './Transaction.styles';
import { TransactionProps } from './Transaction.types';

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
	const { received, title, value, token, failed, pending, topUp, subtitle, exchange, deposit, withdraw } =
		useTransaction({
			transaction
		});
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={styles.container}
			onPress={() => navigation.navigate('TransactionScreen', { transaction })}
		>
			<View style={[styles.leftContainer]}>
				<TransactionIcon {...{ received, failed, pending, topUp, exchange, deposit, withdraw }} />
				<View style={styles.titleContainer}>
					{failed ? (
						<Text type="span" color="alert1" weight="bold">
							{i18n.t('Components.Transaction.failed')}
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
