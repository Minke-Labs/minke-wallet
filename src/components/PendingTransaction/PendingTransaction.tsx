/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useLanguage, useTheme, useTransaction } from '@hooks';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import styles from './PendingTransaction.styles';
import { PendingTransactionProps } from './PendingTransaction.types';

const PendingTransaction: React.FC<PendingTransactionProps> = ({ transaction }: PendingTransactionProps) => {
	const { colors } = useTheme();
	const { i18n } = useLanguage();
	const getMin = useCallback(
		(ts: string) => Math.floor((new Date().getTime() / 1000 - Number(ts)) / 60),
		[transaction]
	);
	const { pending, timestamp, subtitle, value, token, failed } = useTransaction({ transaction, walletDigits: 4 });

	return (
		<View style={[styles.container, { backgroundColor: colors.detail4 }]}>
			<View style={styles.leftContainer}>
				{pending ? <ActivityIndicator size={26} /> : <Icon name="checkmark" size={24} color="alert3" />}

				<View style={{ marginLeft: 8 }}>
					<Text type="p2" weight="semiBold">
						{pending
							? i18n.t('Components.PendingTransactions.pending')
							: failed
							? i18n.t('Components.PendingTransactions.failed')
							: i18n.t('Components.PendingTransactions.success')}
					</Text>
					<Text type="span" weight="semiBold">
						{getMin(timestamp)} min.
					</Text>
				</View>
			</View>

			<View style={styles.centerContainer}>
				<Icon name="arrowRight" size={22} color="text7" />
			</View>

			<View style={styles.rightContainer}>
				<Text type="p2" numberOfLines={1}>
					{subtitle}
				</Text>
				<Text type="span" weight="semiBold">
					{value} {token}
				</Text>
			</View>
		</View>
	);
};

export default PendingTransaction;
