import React, { useState } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Twitter from 'twitter-lite';

import { Button, Input, Snackbar, Text, View } from '@components';
import { TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET, TWITTER_API_KEY, TWITTER_API_SECRET } from '@env';
import { useLanguage } from '@hooks';

import TwitterLogo from './twitter.svg';

interface VerifyTwitterModalProps {
	onTwitterVerified: () => void;
}

const OPENPEER_TWITTER_USER_ID = '1625777806641860609';

const client = new Twitter({
	consumer_key: TWITTER_API_KEY,
	consumer_secret: TWITTER_API_SECRET,
	access_token_key: TWITTER_ACCESS_TOKEN,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

const VerifyTwitterModal = ({ onTwitterVerified }: VerifyTwitterModalProps) => {
	const { i18n } = useLanguage();
	const [twitter, setTwitter] = useState('');
	const [verifying, setVerifying] = useState(false);
	const [verificationFailed, setVerificationFailed] = useState(false);

	const verifyTwitter = async () => {
		if (!twitter) return;
		setVerifying(true);
		try {
			// Get the user ID of the target user
			const { id_str: userId } = await client.get('users/show', { screen_name: twitter });
			// Check if the target user follows you
			const response = await client.get('friendships/show', {
				source_id: OPENPEER_TWITTER_USER_ID,
				target_id: userId
			});

			setVerifying(false);
			if (response.relationship.target.following) {
				onTwitterVerified();
			} else {
				setVerificationFailed(true);
			}
		} catch (error) {
			setVerifying(false);
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
					<TwitterLogo />
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
				title={
					verifying
						? i18n.t('Components.Buttons.verifying')
						: i18n.t('MintNFTScreen.VerifyTwitterModal.verify_twitter_follower')
				}
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
