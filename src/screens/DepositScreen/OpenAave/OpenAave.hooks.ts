import { useState } from 'react';
import { approvalTransaction } from '@models/deposit';
import { globalDepositState } from '@src/stores/DepositStore';
import { globalWalletState } from '@src/stores/WalletStore';
import { getProvider } from '@src/model/wallet';
import { Wallet } from 'ethers';
import { useAmplitude } from '@hooks';
import Logger from '@utils/logger';

export const useOpenAave = ({ onApprove }: { onApprove: () => void }) => {
	const [loading, setLoading] = useState(false);
	const { address, privateKey } = globalWalletState().value;
	const {
		market: { tokens }
	} = globalDepositState().value;
	const { track } = useAmplitude();

	const onOpenAccount = async () => {
		setLoading(true);
		const transaction = await approvalTransaction(address, tokens[0].address);
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
			gasLimit: 100000,
			chainId
		};

		Logger.log(`Approval ${JSON.stringify(txDefaults)}`);

		const signedTx = await wallet.signTransaction(txDefaults);
		const { hash, wait } = await provider.sendTransaction(signedTx as string);
		if (hash) {
			track('Opened AAVE Account', { hash });

			await wait();
			setLoading(false);
			onApprove();
		} else {
			Logger.error('Error approving');
			setLoading(false);
		}
	};

	return {
		loading,
		onOpenAccount
	};
};
