import { useState } from 'react';
import { globalWalletState } from '@src/stores/WalletStore';
import { useAmplitude, useBiconomy, useDepositProtocols } from '@hooks';
import Logger from '@utils/logger';
import DepositSelector from '@src/services/deposit/DepositService';

export const useOpenDepositAccount = ({ onApprove }: { onApprove: () => void }) => {
	const { biconomy, gaslessEnabled } = useBiconomy();
	const [loading, setLoading] = useState(false);
	const { address, privateKey } = globalWalletState().value;
	const { depositableToken, selectedProtocol, depositContract } = useDepositProtocols();
	const { track } = useAmplitude();

	const onOpenAccount = async () => {
		setLoading(true);

		if (!depositableToken || !selectedProtocol || !depositContract) return;
		const hash = await new DepositSelector(selectedProtocol.id).approve({
			gasless: gaslessEnabled,
			address,
			privateKey,
			contract: depositableToken.address,
			spender: depositContract,
			biconomy
		});

		if (hash) {
			track('Opened AAVE Account', { hash, gasless: true });
			setLoading(false);
			onApprove();
		} else {
			Logger.error('Error approving');
			setLoading(false);
		}
	};

	return {
		loading,
		onOpenAccount,
		gaslessEnabled
	};
};
