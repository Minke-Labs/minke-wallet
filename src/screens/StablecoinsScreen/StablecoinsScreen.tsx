import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Text, View, TokenItemCard, EmptyStates, ActivityIndicator, BlankStates } from '@components';
import { AssetsLayout } from '@layouts';
import { useDepositProtocols, useNavigation, useTokens } from '@hooks';
import { TokenType } from '@styles';

const StablecoinsScreen = () => {
	const navigation = useNavigation();
	const { stablecoins, stablecoinsBalance } = useTokens();
	const { apy } = useDepositProtocols();

	if (!stablecoins) return <BlankStates.Save />; // @@@TODO: update blank state without the title

	return (
		<AssetsLayout
			headerValue={stablecoinsBalance}
			headerTitle={
				<Text type="lLarge" weight="semiBold" color="text3">
					Current value
				</Text>
			}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View pl="xs" pt="s">
					<Text type="tSmall" weight="bold" mb="s">
						Stablecoins
					</Text>

					<TouchableOpacity onPress={() => navigation.navigate('SaveScreen')}>
						<View row>
							{apy ? (
								<>
									<Text type="lMedium" weight="semiBold" color="cta1" mb="xs">
										{`Get ${apy}% annualized interest`}
										{/* @@@TODO: - TRANSLATE */}
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
									subtitle="All networks" // @@@TODO: check what this means
									balanceUSD={coin.balanceUSD}
									onPress={() => navigation.navigate('AssetDetailScreen', { coin })}
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
