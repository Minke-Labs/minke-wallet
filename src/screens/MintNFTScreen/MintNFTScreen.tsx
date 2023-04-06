/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import { Image, Linking } from 'react-native';
import RNUxcam from 'react-native-ux-cam';

import { Button, Header, Icon, Modal, ScreenLoadingIndicator, Text, Touchable, View } from '@components';
import { useFormProgress, useLanguage, useMinkeNFT, useNavigation } from '@hooks';
import { BasicLayout } from '@layouts';

import VerifyTelegramModal from './Modals/telegram/VerifyTelegramModal';
import VerifyTwitterModal from './Modals/twitter/VerifyTwitterModal';
import nfts from './nfts.png';

const steps = {
	INITIAL: 0,
	TYPE_TELEGRAM: 1,
	TWITTER: 2,
	TYPE_TWITTER: 3,
	MINT: 4
};

const MintNFTScreen = () => {
	RNUxcam.tagScreenName('NFTMintScreen');
	const { i18n } = useLanguage();
	const navigation = useNavigation();

	const { currentStep, goBack, goForward } = useFormProgress();
	const { minted, mint, token, totalSupply } = useMinkeNFT();
	const [loading, setLoading] = useState(false);

	const nextStep = async () => {
		if (currentStep === steps.INITIAL) await Linking.openURL('https://t.me/minkeapp');
		if (currentStep === steps.TWITTER) await Linking.openURL('https://twitter.com/openpeer_xyz');

		if (currentStep === steps.MINT) {
			if (minted) return;
			setLoading(true);
			await mint();
			setLoading(false);
		} else {
			goForward();
		}
	};

	if (totalSupply === undefined || minted === undefined) {
		return <ScreenLoadingIndicator />;
	}
	const hasNFT = minted && token;
	const mintedImage = hasNFT && token.media[0];
	return (
		<>
			<BasicLayout>
				<Header
					title={i18n.t('MintNFTScreen.title')}
					onRightActionClick={() => navigation.goBack()}
					rightAction={<Icon name="close" size={24} color="text7" />}
				/>

				<View ph="xs" mt="s" cross="center">
					<View mb="s">
						<Image
							style={{ width: 216, height: 216, borderRadius: mintedImage ? 8 : 0 }}
							source={mintedImage ? { uri: token.media[0].gateway } : nfts}
						/>
					</View>
					<Text type="hLarge" weight="bold" color="text1" width={286} center mb="xxs">
						{hasNFT
							? i18n.t('MintNFTScreen.your_minke_whale_nft')
							: i18n.t('MintNFTScreen.claim_a_minke_whale_nft')}
					</Text>
					<Text type="lMedium" weight="semiBold" color="text3" width={286} center mb="xxs">
						{i18n.t('MintNFTScreen.complete_two_tasks')}
					</Text>
					<Text type="span" weight="regular" color="text4" width={286} center mb="s">
						{currentStep < steps.TWITTER
							? i18n.t('MintNFTScreen.join_telegram')
							: currentStep >= steps.MINT
							? i18n.t('MintNFTScreen.you_can_mint')
							: i18n.t('MintNFTScreen.follow_our_new_onramp')}
					</Text>
					<Button
						title={
							loading
								? `${i18n.t('Components.Buttons.loading')}...`
								: hasNFT
								? i18n.t('MintNFTScreen.nft_claimed')
								: currentStep < steps.TWITTER
								? i18n.t('MintNFTScreen.join_telegram_group')
								: currentStep === steps.MINT
								? i18n.t('MintNFTScreen.mint_nft')
								: i18n.t('MintNFTScreen.follow_on_twitter')
						}
						iconRight={
							hasNFT || currentStep === steps.MINT
								? 'tada'
								: currentStep < steps.TWITTER
								? 'telegram'
								: 'twitterStroke'
						}
						disabled={loading || minted || !!token}
						onPress={nextStep}
					/>
					{hasNFT ? (
						<Touchable
							mt="xs"
							onPress={() =>
								Linking.openURL(
									`https://opensea.io/assets/matic/${token.contract.address}/${token.tokenId}`
								)
							}
						>
							<Text type="lSmall" weight="semiBold" color="text7">
								{i18n.t('MintNFTScreen.view_on_opensea')}
							</Text>
						</Touchable>
					) : (
						<View mt="xs">
							<Text type="lSmall" weight="semiBold" color="text3">
								{totalSupply} / 10,000 {i18n.t('MintNFTScreen.already_minted')}
							</Text>
						</View>
					)}
				</View>
			</BasicLayout>

			<Modal isVisible={currentStep === steps.TYPE_TELEGRAM} onDismiss={goBack}>
				<VerifyTelegramModal onTelegramVerified={goForward} />
			</Modal>
			<Modal isVisible={currentStep === steps.TYPE_TWITTER} onDismiss={goBack}>
				<VerifyTwitterModal onTwitterVerified={goForward} />
			</Modal>
		</>
	);
};

export default MintNFTScreen;
