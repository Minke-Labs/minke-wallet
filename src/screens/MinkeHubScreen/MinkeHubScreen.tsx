import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Text, View, ModalReusables, ModalBase, FloatingSelector } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage, useNavigation, useNFT, useTokens } from '@hooks';
import { numberFormat } from '@helpers/utilities';
import MinkeLogo from './MinkeLogo.svg';
import { Card } from './Card/Card';

const MinkeHubScreen = () => {
	const { i18n } = useLanguage();
	const [modal, setModal] = useState(false);
	const navigation = useNavigation();
	const { accountBalance } = useTokens();
	const { balance, stablecoinsBalance, depositedBalance, walletBalance } = accountBalance;
	const { networth } = useNFT();

	return (
		<>
			<BasicLayout>
				<SafeAreaView />
				<ScrollView showsVerticalScrollIndicator={false}>
					<View p="xs">
						<View row cross="center" mb="s">
							<Text type="hMedium" weight="bold">
								Minke Hub
							</Text>
							<View mr="xxs" />
							<MinkeLogo />
						</View>
						<Text type="lMedium" weight="semiBold" color="text3" mb="xxs">
							{i18n.t('MinkeHubScreen.accounts')}
						</Text>
						<Text type="hSmall" weight="bold" color="text2" mb="xs">
							Total: {!!balance && numberFormat(balance, 2)}
						</Text>

						<View mb="xs" row main="center">
							<Card
								onPress={() => navigation.navigate('StablecoinsScreen')}
								icon="dollar"
								title="Stablecoins"
								desc={i18n.t('MinkeHubScreen.coins_pegged_to')}
								number={stablecoinsBalance}
							/>
							<View mh="xxs" />
							<Card
								onPress={() => navigation.navigate('InvestmentsScreen')}
								icon="crypto"
								title={i18n.t('MinkeHubScreen.investments')}
								desc={i18n.t('MinkeHubScreen.fluctuating_value')}
								number={walletBalance}
							/>
						</View>

						<View mb="xs" row main="center">
							<Card
								onPress={() => navigation.navigate('SaveScreen')}
								icon="dollar"
								title={i18n.t('MinkeHubScreen.savings')}
								desc={i18n.t('MinkeHubScreen.earn_passive_income')}
								number={depositedBalance}
							/>
							<View mh="xxs" />
							<Card
								onPress={() => navigation.navigate('NFTScreen')}
								icon="crypto"
								title="NFTs"
								desc={i18n.t('MinkeHubScreen.nfts_and_collectibles')}
								number={networth}
							/>
						</View>

						<Text type="lMedium" weight="semiBold" color="text3" mb="xs">
							{i18n.t('MinkeHubScreen.others')}
						</Text>

						<View mb="xs" row main="center">
							<Card
								onPress={() => setModal(true)}
								icon="vault"
								title={i18n.t('MinkeHubScreen.send_to_bank')}
								desc={i18n.t('MinkeHubScreen.convert_to_local')}
								hideLoading
							/>
							<View mh="xxs" />
							<Card
								onPress={() => navigation.navigate('ReferralScreen')}
								icon="vault"
								title={i18n.t('MinkeHubScreen.referral')}
								desc={i18n.t('MinkeHubScreen.refer_and_earn')}
								hideLoading
							/>
						</View>

					</View>
					<View mb="xxxl" />
					<View mb="m" />
				</ScrollView>
				<FloatingSelector />
			</BasicLayout>
			<ModalBase isVisible={modal} onDismiss={() => setModal(false)}>
				<ModalReusables.ComingSoon onDismiss={() => setModal(false)} />
			</ModalBase>
		</>
	);
};

export default MinkeHubScreen;
