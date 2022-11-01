import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { Icon, Text, View, TokenItemCard, EmptyStates, ActivityIndicator, BlankStates } from '@components';
import { AssetsLayout } from '@layouts';
import { useBalances, useDepositProtocols, useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import { stablecoins as coins } from '@models/token';
import { stables } from '@models/depositTokens';

const StablecoinsScreen = () => {
	RNUxcam.tagScreenName('StablecoinsScreen');
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { stablecoins: walletStablecoins, stablecoinsBalance } = useBalances();
	const { apy } = useDepositProtocols();
	const {
		network: { id }
	} = useGlobalWalletState();
	const stablecoins = coins.map((symbol) => {
		const found = walletStablecoins.find((s) => s.symbol === symbol);
		if (found) {
			return found;
		}

		const { address = '', decimals = 0 } = stables[id][symbol] || {};
		return {
			symbol,
			name: symbol,
			balance: '0',
			balanceUSD: 0,
			address,
			decimals
		};
	});

	if (!walletStablecoins) {
		return <BlankStates.Type2 title={i18n.t('StablecoinsScreen.stablecoins')} />;
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
						{i18n.t('StablecoinsScreen.stablecoins')}
					</Text>

					{!!apy && apy !== '0.00' && (
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
					)}

					<View pr="xs">
						{stablecoins === undefined ? (
							<ActivityIndicator />
						) : stablecoins.length > 0 ? (
							stablecoins.map((coin) => (
								<TokenItemCard
									key={coin.symbol}
									token={coin}
									onPress={() => navigation.navigate('StablecoinsDetailScreen', { coin })}
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
