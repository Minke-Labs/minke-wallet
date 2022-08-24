import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Text, View, ModalReusables, ModalBase } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation, useNFT, useTokens } from '@hooks';
import { numberFormat } from '@helpers/utilities';
import { Selector } from '../HomeScreen/Selector/Selector';
import MinkeLogo from './MinkeLogo.svg';
import { Card } from './Card/Card';

const MinkeHubScreen = () => {
	const [modal, setModal] = useState(false);
	const navigation = useNavigation();
	const { balance, stablecoinsBalance, depositedBalance, walletBalance } = useTokens();
	const { networth } = useNFT();

	return (
		<>
			<BasicLayout>
				<SafeAreaView />
				<ScrollView showsVerticalScrollIndicator={false}>
					<View ph="xs">
						<View row cross="center" mb="s">
							<Text type="hMedium" weight="bold">
								Minke Hub
							</Text>
							<View mr="xxs" />
							<MinkeLogo />
						</View>
						<Text type="lMedium" weight="semiBold" color="text3" mb="xxs">
							Accounts
						</Text>
						<Text type="hSmall" weight="bold" color="text2" mb="xs">
							Total: {!!balance && numberFormat(balance, 2)}
						</Text>
						<View mb="xs" row main="center">
							<Card
								onPress={() => navigation.navigate('StablecoinsScreen')}
								icon="dollar"
								title="Stablecoins"
								desc="Coins pegged to the US dollar"
								number={stablecoinsBalance}
							/>
							<View mr="xs" />
							<Card
								onPress={() => navigation.navigate('InvestmentsScreen')}
								icon="crypto"
								title="Investments"
								desc="Coins with fluctuating value"
								number={walletBalance}
							/>
						</View>
						<View mb="xs" row main="center">
							<Card
								onPress={() => navigation.navigate('SaveScreen')}
								icon="dollar"
								title="Savings"
								desc="Earn passive income from your stablecoins"
								number={depositedBalance}
							/>
							<View mr="xs" />
							<Card
								onPress={() => navigation.navigate('NFTScreen')}
								icon="crypto"
								title="NFTs"
								desc="Non-fungible tokens and collectibles"
								number={networth}
							/>
						</View>
						<Text type="lMedium" weight="semiBold" color="text3" mb="xs">
							Others
						</Text>
						<View mb="xs" row main="center">
							<Card
								onPress={() => setModal(true)}
								icon="vault"
								title="Send to bank"
								desc="Convert to your local currency"
							/>
							<View mr="xs" />
							<Card
								onPress={() => navigation.navigate('ReferralScreen')}
								icon="vault"
								title="Referral"
								desc="Refer a friend and earn free crypto"
							/>
						</View>
					</View>
					<View mb="xxxl" />
					<View mb="m" />
				</ScrollView>
				<Selector />
			</BasicLayout>
			<ModalBase isVisible={modal} onDismiss={() => setModal(false)}>
				<ModalReusables.ComingSoon onDismiss={() => setModal(false)} />
			</ModalBase>
		</>
	);
};

export default MinkeHubScreen;
