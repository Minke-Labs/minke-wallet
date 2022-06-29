import { Share } from 'react-native';
import { useWalletState } from '@hooks';

export const useReceiveModal = () => {
	const { state, ensName } = useWalletState();
	const { address } = state.value;

	const onShare = async () => {
		await Share.share({ message: address });
	};

	return {
		address: address || '',
		ensName,
		onShare
	};
};
