/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Image } from 'react-native';
import RNUxcam from 'react-native-ux-cam';

import { Button, Header, Icon, Modal, Text, View } from '@components';
import { useFormProgress, useLanguage, useNavigation } from '@hooks';
import { BasicLayout } from '@layouts';

import VerifyTelegramModal from './Modals/telegram/VerifyTelegramModal';
import VerifyTwitterModal from './Modals/twitter/VerifyTwitterModal';
import nfts from './nfts.png';

const steps = {
	INITIAL: 0,
	TYPE_TELEGRAM: 1,
	TWITTER: 2,
	TYPE_TWITTER: 3,
	MINT: 4,
	DONE: 5
};

const MintNFTScreen = () => {
	RNUxcam.tagScreenName('NFTMintScreen');
	const { i18n } = useLanguage();
	const navigation = useNavigation();

	const { currentStep, goBack, goForward } = useFormProgress();

	return (
		<>
			<BasicLayout>
				<Header
					title={i18n.t('MintNFTScreen.title')}
					onRightActionClick={() => (currentStep === steps.INITIAL ? navigation.goBack() : goBack())}
					rightAction={<Icon name="close" size={24} color="text7" />}
				/>

				<View ph="xs" mt="s" cross="center">
					<View mb="s">
						<Image source={nfts} />
					</View>
					<Text type="hLarge" weight="bold" color="text1" width={286} center mb="xxs">
						{i18n.t('MintNFTScreen.claim_a_minke_whale_nft')}
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
							currentStep < steps.TWITTER
								? i18n.t('MintNFTScreen.join_telegram_group')
								: currentStep === steps.MINT
								? i18n.t('MintNFTScreen.mint_nft')
								: currentStep === steps.DONE
								? i18n.t('MintNFTScreen.nft_claimed')
								: i18n.t('MintNFTScreen.follow_on_twitter')
						}
						iconRight={
							currentStep < steps.TWITTER
								? 'telegram'
								: currentStep >= steps.MINT
								? 'tada'
								: 'twitterStroke'
						}
						disabled={currentStep === steps.DONE}
						onPress={goForward}
					/>
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
