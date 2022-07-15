import { useState } from '@hookstate/core';
import { Network, networks } from '@models/network';
import { globalWalletState } from '@stores/WalletStore';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnect from '@walletconnect/client';

interface UseWalletManagement {
	canSendTransactions: boolean;
	needToChangeNetwork: boolean;
	network: Network | undefined;
	walletConnect: boolean;
	connector: WalletConnect;
}

const useWalletManagement = (): UseWalletManagement => {
	const { address, privateKey, network } = useState(globalWalletState()).value;
	const connector = useWalletConnect();
	const { connected, accounts, chainId } = connector;

	const needToChangeNetwork = chainId !== network.chainId;
	const canSendTransactions = !!privateKey || (connected && accounts[0] === address);
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
