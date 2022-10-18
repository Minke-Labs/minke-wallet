import { Share } from 'react-native';
import { useGlobalWalletState, useWalletState } from '@hooks';

export const useReceiveModal = () => {
	const { customDomain } = useWalletState();
	const { address } = useGlobalWalletState();

	const onShare = async () => {
		await Share.share({ message: address });
	};

	return {
		address: address || '',
		customDomain,
		onShare
	};
};
