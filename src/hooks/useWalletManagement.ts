import { Network } from '@models/network';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';

interface UseWalletManagement {
	canSendTransactions: boolean;
	needToChangeNetwork: boolean;
	network: Network | undefined;
	walletConnect: boolean;
}

const useWalletManagement = (network: Network | undefined): UseWalletManagement => {
	const { privateKey } = useGlobalWalletState();

	const connectedToWalletConnect = false;
	const needToChangeNetwork = false;
	const canSendTransactions = !!privateKey || connectedToWalletConnect;
	const walletConnect = false;

	return {
		canSendTransactions: canSendTransactions && !needToChangeNetwork,
		needToChangeNetwork,
		network,
		walletConnect
	};
};

export default useWalletManagement;
