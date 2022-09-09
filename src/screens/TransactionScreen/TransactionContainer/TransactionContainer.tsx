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
		<View mb="xs" mh="xs">
			<Paper p="s">

				<View row main="space-between" cross="center" mb="xxxs">
					<Text type="lLarge" weight="semiBold">
						{i18n.t('TransactionScreen.transaction_type')}
					</Text>
					<Text type="lLarge" weight="semiBold">
						{i18n.t('TransactionScreen.date')}
					</Text>
				</View>

				<View row main="space-between" cross="center">
					<View row main="space-between" cross="center">
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
						<Text type="bMedium" weight="regular">
							{description}
						</Text>
					</View>
					<Text type="bMedium" weight="regular">
						{date}
					</Text>
				</View>

			</Paper>
		</View>
	);
};
