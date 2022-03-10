import React from 'react';
import { View } from 'react-native';
import { useTheme, useNavigation } from '@hooks';
import { FlatList } from 'react-native-gesture-handler';
import { numberFormat } from '@src/helpers/utilities';
import { Text, Card, Button, TransactionIcon } from '@components';
import { makeStyles } from './Body.styles';
import { BodyProps } from './Body.types';

export const Body: React.FC<BodyProps> = ({ lending }) => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.depositCardContainer}>
			<View style={styles.actionDepositCard}>
				<FlatList
					keyExtractor={(item, idx) => `${item.address}${idx}`}
					data={lending.assets}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => {
						const deposit = item.groupId === 'supply';
						const { symbol } = item.tokens[0];
						return (
							<Card
								image={<TransactionIcon received={deposit} />}
								title={symbol}
								subtitle={deposit ? 'Deposit' : 'Borrow'}
								marginBottom={index === lending.assets.length - 1 ? 0 : 32}
								right={
									<View>
										<Text style={{ fontSize: 12, alignSelf: 'flex-end' }}>
											{item.balance.toFixed(2)} {symbol}
										</Text>
										<Text type="p2" weight="bold" style={{ alignSelf: 'flex-end' }}>
											{numberFormat(item.balanceUSD)}
										</Text>
									</View>
								}
							/>
						);
					}}
				/>
			</View>
			<Button title="Deposit" onPress={() => navigation.navigate('DepositScreen')} />
		</View>
	);
};
