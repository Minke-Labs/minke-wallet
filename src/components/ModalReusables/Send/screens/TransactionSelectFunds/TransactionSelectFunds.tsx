import React from 'react';
import { View, FlatList, Image } from 'react-native';
import Text from '@src/components/Text/Text';
import BlankStates from '@src/components/BlankStates';
import EmptyStates from '@src/components/EmptyStates';
import { useLanguage } from '@hooks';
import { styles } from './TransactionSelectFunds.styles';
import { Card } from '../../components';
import { TransactionSelectFundsProps } from './TransactionSelectFunds.types';
import { useTransactionSelectFunds } from './TransactionSelectFunds.hooks';

const TransactionSelectFunds: React.FC<TransactionSelectFundsProps> = ({ user, onSelected }) => {
	const { i18n } = useLanguage();
	const { image, tokens } = useTransactionSelectFunds({ user });

	return (
		<View style={styles.container}>
			{!!user.address && <Image source={image!} style={styles.image} />}
			<Text type="h3" weight="extraBold" marginBottom={32}>
				{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionSelectFunds.which')}
				<Text color="text12" type="h3" weight="extraBold">
					{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionSelectFunds.asset')}
				</Text>{' '}
				{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionSelectFunds.want_to_send')}
				<Text color="text12" type="h3" weight="extraBold">
					{user.name}
				</Text>
				?
			</Text>
			{tokens === undefined ? (
				<BlankStates.Send />
			) : tokens.length > 0 ? (
				<FlatList
					style={styles.tokensList}
					keyExtractor={(item) => item.symbol}
					data={tokens}
					renderItem={({ item }) => <Card token={item} onSelected={() => onSelected(item)} />}
				/>
			) : (
				<EmptyStates.NoTokens />
			)}
		</View>
	);
};

export default TransactionSelectFunds;
