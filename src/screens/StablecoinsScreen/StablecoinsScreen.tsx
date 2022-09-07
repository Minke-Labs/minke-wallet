import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Text, View, TokenItemCard, EmptyStates, ActivityIndicator, BlankStates } from '@components';
import { AssetsLayout } from '@layouts';
import { useDepositProtocols, useLanguage, useNavigation, useTokens } from '@hooks';
import { TokenType } from '@styles';

const StablecoinsScreen = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { accountBalance } = useTokens();
	const { stablecoins, stablecoinsBalance } = accountBalance;
	const { apy } = useDepositProtocols();

	if (!stablecoins) {
		return (
			<BlankStates.Type2 title="Stablecoins" />
		);
	}

	return (
		<AssetsLayout
			headerValue={stablecoinsBalance}
			headerTitle={
				<Text type="lLarge" weight="semiBold" color="text3">
					{i18n.t('StablecoinsScreen.current_value')}
				</Text>
			}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View pl="xs" pt="s">
					<Text type="tSmall" weight="bold" mb="xs">
						Stablecoins
					</Text>

					<TouchableOpacity onPress={() => navigation.navigate('SaveScreen')}>
						<View row>
							{apy ? (
								<>
									<Text type="lMedium" weight="semiBold" color="cta1" mb="xs">
										{i18n.t('StablecoinsScreen.get_annualized_interest', { apy })}
									</Text>
									<Icon name="chevronRight" size={20} color="cta1" />
								</>
							) : (
								<ActivityIndicator size={16} />
							)}
						</View>
					</TouchableOpacity>

					<View pr="xs">
						{stablecoins === undefined ? (
							<ActivityIndicator />
						) : stablecoins.length > 0 ? (
							stablecoins.map((coin) => (
								<TokenItemCard
									key={coin.symbol}
									token={coin.symbol.toLowerCase() as TokenType}
									name={coin.name}
									symbol={coin.symbol}
									balance={coin.balance}
									balanceUSD={coin.balanceUSD}
									onPress={() => navigation.navigate('StablecoinsDetailScreen', { coin })}
									stablecoin
									paper
								/>
							))
						) : (
							<EmptyStates.NoTokens />
						)}
					</View>
				</View>
			</ScrollView>
		</AssetsLayout>
	);
};

export default StablecoinsScreen;
