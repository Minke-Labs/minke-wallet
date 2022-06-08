import { useCallback, useState } from 'react';
import Logger from '@utils/logger';

const CODE_LENGTH = 6;
const useEnterReferralCodeScreen = () => {
	const [code, setCode] = useState<string>();
	const formatCode = useCallback(
		(t: string) => {
			setCode(t.toUpperCase());
		},
		[setCode]
	);

	const invalidCode = !code || code.length !== CODE_LENGTH;

	const onConfirm = () => {
		if (!invalidCode) {
			Logger.log({ code });
		}
	};
	return {
		code,
		setCode: formatCode,
		invalidCode,
		onConfirm
	};
};

export default useEnterReferralCodeScreen;
