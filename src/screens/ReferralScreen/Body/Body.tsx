import React from 'react';
import { FlatList, View } from 'react-native';
import { useLanguage, useTheme } from '@hooks';
import { Card, EmptyStates, Text, TransactionIcon } from '@components';
import { Reward } from '@src/services/apis/minke/minke.types';
import { format } from 'date-fns';
import { POINTS_PER_REWARD, tokenBalanceFormat } from '@helpers/utilities';
import { makeStyles } from './Body.styles';

export const Body = ({ onEarnPress, rewards }: { onEarnPress: () => void; rewards: Reward[] }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { i18n } = useLanguage();

	return (
		<View style={styles.depositCardContainer}>
			<View style={styles.actionDepositCard}>
				{rewards.length > 0 ? (
					<FlatList
						keyExtractor={(item) => item.id.toString()}
						data={rewards}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => (
							<Card
								image={<TransactionIcon received={item.claimed} withdraw={!item.claimed} />}
								title={format(item.timestamp, 'h:mm aaa')}
								subtitle={
									item.referral.wallet === item.wallet
										? i18n.t('ReferralScreen.Body.referral')
										: i18n.t('ReferralScreen.Body.deposit')
								}
								marginBottom={index === rewards.length - 1 ? 0 : 32}
								right={
									<View>
										<Text style={{ fontSize: 12, alignSelf: 'flex-end' }}>
											{item.claimed && item.amount
												? `${tokenBalanceFormat(item.amount, 4)} MATIC`
												: i18n.t('ReferralScreen.Body.points', { count: POINTS_PER_REWARD })}
										</Text>
										<Text type="p2" weight="bold" style={{ alignSelf: 'flex-end' }}>
											$10
										</Text>
									</View>
								}
							/>
						)}
					/>
				) : (
					<EmptyStates.NoReferralPoints onEarnPress={onEarnPress} />
				)}
			</View>
		</View>
	);
};
