import React, { useState } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Button, Input, Snackbar, Text, View } from '@components';
import { useLanguage } from '@hooks';

import Twitter from './twitter.svg';

interface VerifyTwitterModalProps {
	onTwitterVerified: () => void;
}

const VerifyTwitterModal = ({ onTwitterVerified }: VerifyTwitterModalProps) => {
	const { i18n } = useLanguage();
	const [twitter, setTwitter] = useState('');
	const [verificationFailed, setVerificationFailed] = useState(false);

	const verifyTwitter = async () => {
		if (!twitter) return;

		if (twitter === 'ave') {
			onTwitterVerified();
		} else {
			setVerificationFailed(true);
		}
	};

	return (
		<>
			<View ph="s">
				<View row cross="center" mb="s">
					<View mr="xxs">
						<Text type="h3" weight="extraBold">
							{i18n.t('MintNFTScreen.VerifyTwitterModal.verify_twitter')}
						</Text>
					</View>
					<Twitter />
				</View>
			</View>
			<View mb="s">
				<Input
					label={i18n.t('Components.Inputs.enter_username')}
					value={twitter}
					onChangeText={setTwitter}
					autoCompleteType="off"
					autoCapitalize="none"
				/>
			</View>
			<Button
				title={i18n.t('MintNFTScreen.VerifyTwitterModal.verify_twitter_follower')}
				mb="l"
				disabled={!twitter}
				onPress={verifyTwitter}
			/>
			<KeyboardSpacer />
			<Snackbar
				onDismiss={() => setVerificationFailed(false)}
				visible={verificationFailed}
				title={i18n.t('MintNFTScreen.VerifyTwitterModal.verification_failed')}
			/>
		</>
	);
};

export default VerifyTwitterModal;
