import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalWalletState } from '@stores/WalletStore';
import { createReferralCode } from '@src/services/apis';

const useReferralCode = () => {
	const [code, setCode] = React.useState<string>();
	const { address } = useState(globalWalletState()).value;

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
