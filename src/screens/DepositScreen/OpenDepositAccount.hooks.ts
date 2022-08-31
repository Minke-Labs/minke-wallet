import React from 'react';
import { globalWalletState } from '@src/stores/WalletStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAmplitude, useBiconomy, useDepositProtocols, useWalletManagement } from '@hooks';
import Logger from '@utils/logger';
import DepositService from '@src/services/deposit/DepositService';
import { getProvider } from '@models/wallet';
import { useState } from '@hookstate/core';
import { captureException } from '@sentry/react-native';

export const useOpenDepositAccount = ({ onApprove }: { onApprove: () => void }) => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const [loading, setLoading] = React.useState(false);
	const [blockchainError, setBlockchainError] = React.useState(false);
	const { address, privateKey } = useState(globalWalletState()).value;
	const { depositableToken, selectedProtocol, depositContract } = useDepositProtocols();
	const { canSendTransactions, needToChangeNetwork, walletConnect, connector } = useWalletManagement();
	const { track } = useAmplitude();
	const cannotOpenAccount = !depositableToken || !selectedProtocol || !depositContract;

	const onOpenAccount = async () => {
		setLoading(true);

		if (cannotOpenAccount) return;
		try {
			const hash = await new DepositService(selectedProtocol.id).approve({
				gasless: gaslessEnabled,
				address,
				privateKey,
				contract: depositableToken.address,
				biconomy,
				walletConnect,
				connector
			});

			if (hash) {
				const provider = await getProvider();
				await provider.waitForTransaction(hash);
				await AsyncStorage.setItem(`@approved-${selectedProtocol.id}`, 'true');
				track(`Opened ${selectedProtocol.name} Account`, { hash, gasless: gaslessEnabled });
				setLoading(false);
				onApprove();
			} else {
				Logger.error('Error approving');
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			captureException(error);
			Logger.error('Open account blockchain error', error);
			setBlockchainError(true);
		}
	};

	return {
		loading,
		onOpenAccount,
		gaslessEnabled,
		blockchainError,
		setBlockchainError,
		canSendTransactions,
		needToChangeNetwork,
		cannotOpenAccount
	};
};
