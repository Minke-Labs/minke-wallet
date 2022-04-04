import { useState } from 'react';
import { approvalTransaction } from '@models/deposit';
import { globalDepositState } from '@src/stores/DepositStore';
import { globalWalletState } from '@src/stores/WalletStore';
import { getProvider } from '@src/model/wallet';
import { Wallet } from 'ethers';
import { useAmplitude, useAuthentication, useBiconomy } from '@hooks';
import Logger from '@utils/logger';
import { aaveDepositContract, gaslessApproval } from '@models/gaslessTransaction';

export const useOpenAave = ({ onApprove }: { onApprove: () => void }) => {
	const biconomy = useBiconomy();
	const [loading, setLoading] = useState(false);
	const {
		address,
		privateKey,
		network: { biconomyAPIKey }
	} = globalWalletState().value;
	const {
		market: { tokens }
	} = globalDepositState().value;
	const { track } = useAmplitude();
	const { showAuthenticationPrompt } = useAuthentication();
	const gaslessApprovalEnabled = !!biconomyAPIKey;

	const onOpenAccount = () => {
		showAuthenticationPrompt({
			onSuccess: async () => {
				setLoading(true);

				if (gaslessApprovalEnabled) {
					if (biconomy.status !== biconomy.READY) return;
					const hash = await gaslessApproval({
						address,
						privateKey,
						biconomy,
						contract: tokens[0].address,
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
						track('Opened AAVE Account', { hash, gasless: false });

						await wait();
						setLoading(false);
						onApprove();
					} else {
						Logger.error('Error approving');
						setLoading(false);
					}
				}
			}
		});
	};

	return {
		loading,
		onOpenAccount,
		gaslessApprovalEnabled
	};
};
