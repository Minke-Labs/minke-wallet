import React, { useState } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Button, Input, Snackbar, Text, View } from '@components';
import { useLanguage } from '@hooks';

import Telegram from './telegram.svg';

interface VerifyTelegramModalProps {
	onTelegramVerified: () => void;
}

const VerifyTelegramModal = ({ onTelegramVerified }: VerifyTelegramModalProps) => {
	const { i18n } = useLanguage();
	const [telegram, setTelegram] = useState('');
	const [verificationFailed, setVerificationFailed] = useState(false);

	const verifyTelegram = async () => {
		if (!telegram) return;

		if (telegram === 'ave') {
			onTelegramVerified();
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
							{i18n.t('MintNFTScreen.VerifyTelegramModal.verify_telegram')}
						</Text>
					</View>
					<Telegram />
				</View>
			</View>
			<View mb="s">
				<Input
					label={i18n.t('Components.Inputs.enter_username')}
					value={telegram}
					onChangeText={setTelegram}
					autoCompleteType="off"
					autoCapitalize="none"
				/>
			</View>
			<Button
				title={i18n.t('MintNFTScreen.VerifyTelegramModal.verify_telegram_membership')}
				mb="l"
				disabled={!telegram}
				onPress={verifyTelegram}
			/>
			<KeyboardSpacer />
			<Snackbar
				onDismiss={() => setVerificationFailed(false)}
				visible={verificationFailed}
				title={i18n.t('MintNFTScreen.VerifyTelegramModal.verification_failed')}
			/>
		</>
	);
};

export default VerifyTelegramModal;
