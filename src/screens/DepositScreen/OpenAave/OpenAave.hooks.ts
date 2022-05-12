import { useState } from 'react';
import { approvalTransaction } from '@models/deposit';
import { globalWalletState } from '@src/stores/WalletStore';
import { getProvider } from '@src/model/wallet';
import { Wallet } from 'ethers';
import { useAmplitude, useBiconomy, useDepositProtocols } from '@hooks';
import Logger from '@utils/logger';
import { aaveDepositContract, gaslessApproval } from '@models/gaslessTransaction';

export const useOpenAave = ({ onApprove }: { onApprove: () => void }) => {
	const [blockchainError, setBlockchainError] = useState(false);
	const { biconomy, gaslessEnabled } = useBiconomy();
	const [loading, setLoading] = useState(false);
	const { address, privateKey } = globalWalletState().value;
	const { depositableToken } = useDepositProtocols();
	const { track } = useAmplitude();

	const onOpenAccount = async () => {
		setLoading(true);

		if (!depositableToken) return;
		if (gaslessEnabled) {
			try {
				const hash = await gaslessApproval({
					address,
					privateKey,
					biconomy,
					contract: depositableToken.address,
					spender: aaveDepositContract
				});
				if (hash) {
					track('Opened AAVE Account', { hash, gasless: true });
					setLoading(false);
					onApprove();
				} else {
					Logger.error('Error approving');
					setLoading(false);
					setBlockchainError(true);
				}
			} catch (e) {
				setLoading(false);
				setBlockchainError(true);
			}
		} else {
			const transaction = await approvalTransaction(address, depositableToken.address);
			const { data, from, to, maxFeePerGas, maxPriorityFeePerGas } = transaction;
			const provider = await getProvider();
			const wallet = new Wallet(privateKey, provider);
			const chainId = await wallet.getChainId();
			const nonce = await provider.getTransactionCount(address, 'latest');
			Logger.log(`Approval API ${JSON.stringify(transaction)}`);
			const txDefaults = {
				from,
				to,
				data,
				nonce,
				maxFeePerGas,
				maxPriorityFeePerGas,
				type: 2,
				gasLimit: 500000,
				chainId
			};

			try {
				Logger.log(`Approval ${JSON.stringify(txDefaults)}`);
				const signedTx = await wallet.signTransaction(txDefaults);
				const { hash, wait } = await provider.sendTransaction(signedTx as string);
				if (hash) {
					track('Opened AAVE Account', { hash, gasless: false });

					await wait();
					setLoading(false);
					onApprove();
				} else {
					Logger.error('Error approving');
					setLoading(false);
				}
			} catch (e) {
				setBlockchainError(true);
				setLoading(false);
			}
		}
	};

	return {
		loading,
		onOpenAccount,
		gaslessEnabled,
		blockchainError,
		setBlockchainError
	};
};
