import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Text, View, ModalReusables, ModalBase } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { Selector } from '../HomeScreen/Selector/Selector';
import MinkeLogo from './MinkeLogo.svg';
import { Card } from './Card/Card';

const MinkeHubScreen = () => {
	const [modal, setModal] = useState(false);
	const navigation = useNavigation();
	return (
		<>
			<BasicLayout>
				<SafeAreaView />
				<ScrollView showsVerticalScrollIndicator={false}>
					<View ph={3}>
						<View row cross="center" mb={4}>
							<Text type="hMedium" weight="bold">
								Minke Hub
							</Text>
							<View mr={2} />
							<MinkeLogo />
						</View>
						<Text type="lMedium" weight="semiBold" color="text3" mb={2}>
							Accounts
						</Text>
						<Text type="hSmall" weight="bold" color="text2" mb={3}>
							Total: $1223.98
						</Text>
						<View mb={3} row main="center">
							<Card
								onPress={() => navigation.navigate('StablecoinsScreen')}
								icon="dollar"
								title="Stablecoins"
								desc="Coins pegged to the US dollar"
								number="$193.29"
							/>
							<View mr={3} />
							<Card
								onPress={() => navigation.navigate('InvestmentsScreen')}
								icon="crypto"
								title="Investments"
								desc="Coins with fluctuating value"
								number="$193.29"
							/>
						</View>
						<View mb={3} row main="center">
							<Card
								onPress={() => navigation.navigate('SaveScreen')}
								icon="dollar"
								title="Savings"
								desc="Earn passive income from your stablecoins"
								number="$193.29"
							/>
							<View mr={3} />
							<Card
								onPress={() => navigation.navigate('NFTScreen')}
								icon="crypto"
								title="NFTs"
								desc="Non-fungible tokens and collectibles"
								number="$193.29"
							/>
						</View>
						<Text type="lMedium" weight="semiBold" color="text3" mb={3}>
							Others
						</Text>
						<View mb={3} row main="center">
							<Card
								onPress={() => setModal(true)}
								icon="vault"
								title="Send to bank"
								desc="Convert to your local currency"
							/>
							<View mr={3} />
							<Card
								onPress={() => navigation.navigate('ReferralScreen')}
								icon="vault"
								title="Referral"
								desc="Refer a friend and earn free crypto"
							/>
						</View>
					</View>
				</ScrollView>
				<Selector />
			</BasicLayout>
			<ModalBase isVisible={modal} onDismiss={() => setModal(false)}>
				<ModalReusables.ComingSoon
					onDismiss={() => setModal(false)}
				/>
			</ModalBase>
		</>
	);
};

export default MinkeHubScreen;
