import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

interface UseWalletManagement {
	canSendTransactions: boolean;
	source: 'local' | 'wallet_connect' | null;
}

const useWalletManagement = (): UseWalletManagement => {
	const { address, privateKey } = useState(globalWalletState()).value;
	const { connected, accounts } = useWalletConnect();

	const canSendTransactions = !!privateKey || (connected && accounts[0] === address);
	// eslint-disable-next-line no-nested-ternary
	const source = canSendTransactions ? (privateKey ? 'local' : 'wallet_connect') : null;

	return {
		canSendTransactions,
		source
	};
};

export default useWalletManagement;
