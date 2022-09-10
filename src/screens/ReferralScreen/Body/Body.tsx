/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { FlatList } from 'react-native';
import { useLanguage } from '@hooks';
import { EmptyStates, Text, TransactionIcon, View, Paper } from '@components';
import { Reward } from '@src/services/apis/minke/minke.types';
import { format } from 'date-fns';
import { REFERRAL_POINTS_TO_USD_CONVERSION, tokenBalanceFormat } from '@helpers/utilities';
import Card from './Card/Card';

export const Body = ({ onEarnPress, rewards }: { onEarnPress: () => void; rewards: Reward[] }) => {
	const { i18n } = useLanguage();

	return (
		<View
			flex1
			bgc="background1"
			pv="m"
			btlr="s"
			btrr="s"
		>
			<Paper p="xs" mb="m" mh="xs">
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
									item.referral.wallet !== item.wallet
										? i18n.t('ReferralScreen.Body.referral')
										: item.source === 'exchange'
										? i18n.t('ReferralScreen.Body.exchange')
										: i18n.t('ReferralScreen.Body.deposit')
								}
								mb={index === rewards.length - 1 ? 'zero' : 'm'}
								right={
									<View cross="flex-end">
										<Text type="lSmall">
											{item.claimed && item.amount
												? `${tokenBalanceFormat(item.amount, 4)} USDC`
												: i18n.t('ReferralScreen.Body.points', { count: item.points })}
										</Text>
										<Text type="tSmall" weight="bold">
											${item.points * REFERRAL_POINTS_TO_USD_CONVERSION}
										</Text>
									</View>
								}
							/>
						)}
					/>
				) : (
					<EmptyStates.NoReferralPoints onEarnPress={onEarnPress} />
				)}
			</Paper>
		</View>
	);
};
