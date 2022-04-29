import React from 'react';
import { View } from 'react-native';
import { useTheme, useNavigation } from '@hooks';
import { FlatList } from 'react-native-gesture-handler';
import { tokenBalanceFormat } from '@helpers/utilities';
import { Text, Card, Button, TransactionIcon } from '@components';
import { depositSymbol } from '@models/deposit';
import { makeStyles } from './Body.styles';
import { BodyProps } from './Body.types';

export const Body: React.FC<BodyProps> = ({ interestTokens }) => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.depositCardContainer}>
			<View style={styles.actionDepositCard}>
				<FlatList
					keyExtractor={(item) => item.address}
					data={interestTokens}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => {
						const symbol = depositSymbol[item.symbol];
						return (
							<Card
								image={<TransactionIcon received />}
								title={symbol}
								subtitle="Deposit"
								marginBottom={index === interestTokens.length - 1 ? 0 : 32}
								right={
									<View>
										<Text style={{ fontSize: 12, alignSelf: 'flex-end' }}>
											{tokenBalanceFormat(item.balance, 4)} {symbol}
										</Text>
										<Text type="p2" weight="bold" style={{ alignSelf: 'flex-end' }}>
											${tokenBalanceFormat(item.balance, 2)}
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
