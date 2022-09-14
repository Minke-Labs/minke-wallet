import { Network, networks } from '@models/network';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnect from '@walletconnect/client';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';

interface UseWalletManagement {
	canSendTransactions: boolean;
	needToChangeNetwork: boolean;
	network: Network | undefined;
	walletConnect: boolean;
	connector: WalletConnect;
}

const useWalletManagement = (): UseWalletManagement => {
	const { address, privateKey, network } = useGlobalWalletState();

	const connector = useWalletConnect();
	const { connected, accounts, chainId } = connector;

	const connectedToWalletConnect = connected && accounts[0] === address;
	const needToChangeNetwork = connectedToWalletConnect && chainId !== network.chainId;
	const canSendTransactions = !!privateKey || connectedToWalletConnect;
	const rightNetwork = Object.values(networks).find((n) => n.chainId === chainId);
	const walletConnect = canSendTransactions && !needToChangeNetwork && !privateKey && connected;

	return {
		canSendTransactions: canSendTransactions && !needToChangeNetwork,
		needToChangeNetwork,
		network: rightNetwork,
		walletConnect,
		connector
	};
};

export default useWalletManagement;
