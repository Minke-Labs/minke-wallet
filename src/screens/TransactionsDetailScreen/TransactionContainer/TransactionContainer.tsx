import React from 'react';
import {
	Text,
	Paper,
	TransactionIcon,
	View
} from '@components';
import { useLanguage } from '@hooks';

interface TransactionContainerProps {
	received: boolean;
	topUp: boolean;
	exchange: boolean;
	withdraw: boolean;
	failed: boolean;
	pending: boolean;
	deposit: boolean;
	date: string;
	description: string;
}

export const TransactionContainer: React.FC<TransactionContainerProps> = ({
	received,
	topUp,
	exchange,
	withdraw,
	failed,
	pending,
	deposit,
	date,
	description
}) => {
	const { i18n } = useLanguage();
	return (
		<Paper ph="s" pv="xs" mh="xs" mb="xs">

			<View mb="xxs">
				<Text type="lLarge" weight="semiBold">
					{i18n.t('TransactionsDetailScreen.transaction_type')}
				</Text>
				<View row cross="center">
					<TransactionIcon
						size={20}
						arrowSize={10}
						{...{
							received,
							failed,
							pending,
							topUp,
							exchange,
							deposit,
							withdraw
						}}
					/>
					<View mr="xxs" />
					<Text type="lLarge" weight="regular">
						{description}
					</Text>
				</View>
			</View>

			<Text type="lLarge" weight="semiBold">
				{i18n.t('TransactionsDetailScreen.date')}
			</Text>

			<Text type="lLarge" weight="regular">
				{date}
			</Text>

		</Paper>
	);
};
