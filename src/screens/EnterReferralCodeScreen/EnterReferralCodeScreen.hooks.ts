import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReferral, getUsedReferralCode } from '@src/services/apis';
import { globalWalletState } from '@stores/WalletStore';
import { Alert } from 'react-native';
import { useLanguage } from '@hooks';

const CODE_LENGTH = 6;
const useEnterReferralCodeScreen = () => {
	const { address } = globalWalletState().value;
	const [code, setCode] = useState<string>();
	const [disableCode, setDisableCode] = useState(false);
	const [loading, setLoading] = useState(false);
	const { i18n } = useLanguage();

	useEffect(() => {
		const fetchCodeInUse = async () => {
			const savedCode = await AsyncStorage.getItem('@referralCodeInUse');

			if (savedCode) {
				setCode(savedCode);
				setDisableCode(true);
			} else if (address) {
				const { code: codeInUse } = await getUsedReferralCode(address);
				if (codeInUse) {
					await AsyncStorage.setItem('@referralCodeInUse', codeInUse);
					setCode(codeInUse);
					setDisableCode(true);
				}
			}
		};
		fetchCodeInUse();
	}, [address]);

	const formatCode = useCallback(
		(t: string) => {
			setCode(t.toUpperCase());
		},
		[setCode]
	);

	const invalidCode = !code || code.length !== CODE_LENGTH;

	const onConfirm = async () => {
		if (code && !invalidCode) {
			setLoading(true);
			const referral = await createReferral(address, code);
			const { error, referral_code: referralCode } = referral;

			if (error) {
				Alert.alert(
					i18n.t('EnterReferralCodeScreen.invalid_code'),
					i18n.t('EnterReferralCodeScreen.your_code_is_invalid')
				);
			} else {
				await AsyncStorage.setItem('@referralCodeInUse', referralCode.code);
				setCode(referralCode.code);
				setDisableCode(true);
			}
			setLoading(false);
		}
	};

	return {
		code,
		setCode: formatCode,
		invalidCode,
		onConfirm,
		loading,
		disableCode
	};
};

export default useEnterReferralCodeScreen;
