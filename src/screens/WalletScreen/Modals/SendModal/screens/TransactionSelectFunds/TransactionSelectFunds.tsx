import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { Text, EmptyStates } from '@components';
import { styles } from './TransactionSelectFunds.styles';
import { Card } from '../../components';
import { TransactionSelectFundsProps } from './TransactionSelectFunds.types';
import { useTransactionSelectFunds } from './TransactionSelectFunds.hooks';

const TransactionSelectFunds: React.FC<TransactionSelectFundsProps> = ({ user, onSelected }) => {
	const { image, tokens } = useTransactionSelectFunds({ user });

	return (
		<View style={styles.container}>
			{!!user.address && <Image source={image!} style={styles.image} />}
			<Text type="h3" weight="extraBold" marginBottom={32}>
				Which{' '}
				<Text color="text12" type="h3" weight="extraBold">
					asset
				</Text>{' '}
				do you want to send to{' '}
				<Text color="text12" type="h3" weight="extraBold">
					{user.name}
				</Text>
				?
			</Text>
			{tokens && tokens.length > 0 ? (
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
