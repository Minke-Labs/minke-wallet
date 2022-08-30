import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useLanguage, useNavigation, useTransaction } from '@hooks';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import ActivityIndicator from '@src/components/ActivityIndicator/ActivityIndicator';
import { PendingTransactionProps } from './PendingTransaction.types';

const PendingTransaction: React.FC<PendingTransactionProps> = ({ transaction }) => {
	const { i18n } = useLanguage();
	const getMin = useCallback(
		(ts: string) => Math.floor((new Date().getTime() / 1000 - Number(ts)) / 60),
		[transaction]
	);
	const { pending, timestamp, subtitle, value, token, failed } = useTransaction({ transaction, walletDigits: 4 });
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('TransactionScreen', { transaction })}
		>
			<View
				h={55}
				mb="xs"
				pv="xxs"
				ph="xs"
				br="xs"
				row
				main="space-between"
				bgc="detail4"
			>
				<View row cross="center">
					{pending ? (
						<ActivityIndicator size={26} />
					) : failed ? (
						<Icon name="error" size={24} color="alert1" />
					) : (
						<Icon name="checkmark" size={24} color="alert3" />
					)}
					<View ml="xxs">
						<Text type="lLarge" weight="semiBold">
							{pending
								? i18n.t('Components.PendingTransactions.pending')
								: failed
									? i18n.t('Components.PendingTransactions.failed')
									: i18n.t('Components.PendingTransactions.success')}
						</Text>
						<Text type="lSmall" color="text4" weight="semiBold">
							{getMin(timestamp)} min.
						</Text>
					</View>
				</View>

				<View main="center">
					<Icon name="arrowRight" size={23} color="text7" />
				</View>

				<View cross="flex-end">
					<Text type="bMedium" color="text4" numberOfLines={1}>
						{subtitle}
					</Text>
					<Text type="lSmall" color="text3" weight="semiBold">
						{value} {token}
					</Text>
				</View>

			</View>

		</TouchableOpacity>
	);
};

export default PendingTransaction;
