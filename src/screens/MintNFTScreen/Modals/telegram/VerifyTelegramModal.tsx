import React, { useState } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Button, Input, Snackbar, Text, View } from '@components';
import { delay } from '@helpers/utilities';
import { useLanguage } from '@hooks';

import Telegram from './telegram.svg';

interface VerifyTelegramModalProps {
	onTelegramVerified: () => void;
}

const VerifyTelegramModal = ({ onTelegramVerified }: VerifyTelegramModalProps) => {
	const { i18n } = useLanguage();
	const [telegram, setTelegram] = useState('');

	const [verifying, setVerifying] = useState(false);
	const [verificationFailed, setVerificationFailed] = useState(false);

	const verifyTelegram = async () => {
		if (!telegram) return;
		setVerifying(true);
		await delay(1300);

		setVerifying(false);
		onTelegramVerified();
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
				title={
					verifying
						? i18n.t('Components.Buttons.verifying')
						: i18n.t('MintNFTScreen.VerifyTelegramModal.verify_telegram_membership')
				}
				mb="l"
				disabled={!telegram || verifying}
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
