import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReferralCode } from '@src/services/apis';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';

const useReferralCode = () => {
	const [code, setCode] = useState<string>();
	const { address } = useGlobalWalletState();

	useEffect(() => {
		const fetchCode = async () => {
			if (address) {
				const saved = await AsyncStorage.getItem(`@referral_code-${address}`);
				if (saved) {
					setCode(saved);
				} else {
					const { code: apiCode } = await createReferralCode(address);
					await AsyncStorage.setItem(`@referral_code-${address}`, apiCode);
					setCode(apiCode);
				}
			}
		};

		fetchCode();
	}, [address]);

	return {
		code
	};
};

export default useReferralCode;
