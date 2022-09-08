import { useState } from 'react';
import { approvalTransaction } from '@models/deposit';
import { getProvider } from '@src/model/wallet';
import { Wallet } from 'ethers';
import { useAmplitude, useBiconomy, useDepositProtocols, useGlobalWalletState } from '@hooks';
import Logger from '@utils/logger';
import { gaslessApproval } from '@models/gaslessTransaction';

export const useOpenSavings = ({ onApprove }: { onApprove: () => void }) => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const [loading, setLoading] = useState(false);
	const {
		address,
		privateKey,
		network: {
			aave: { depositContract: aaveDepositContract }
		}
	} = useGlobalWalletState();
	const { depositableToken } = useDepositProtocols();
	const { track } = useAmplitude();

	const onOpenAccount = async () => {
		setLoading(true);

		if (!depositableToken) return;
		if (gaslessEnabled) {
			const hash = await gaslessApproval({
				address,
				privateKey: privateKey!,
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
			}
		} else {
			const transaction = await approvalTransaction(address, depositableToken.address);
			const { data, from, to, maxFeePerGas, maxPriorityFeePerGas } = transaction;
			const provider = await getProvider();
			const wallet = new Wallet(privateKey!, provider);
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
		}
	};

	return {
		loading,
		onOpenAccount,
		gaslessEnabled
	};
};
