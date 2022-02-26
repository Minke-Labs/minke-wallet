import React, { useEffect } from 'react';
import { approvalState } from '@models/deposit';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import AppLoading from 'expo-app-loading';
import Deposit from './Deposit/Deposit';
import OpenAave from './OpenAave/OpenAave';

const DepositScreen = () => {
	const [approved, setApproved] = React.useState<boolean | undefined>();
	const {
		market: { tokens = [] }
	} = globalDepositState().value;
	const { address } = globalWalletState().value;

	useEffect(() => {
		const loadApproved = async () => {
			if (tokens[0]) {
				const { isApproved } = await approvalState(address, tokens[0].address);
				setApproved(isApproved);
			}
		};

		loadApproved();
	}, []);

	if (approved === undefined) {
		return <AppLoading />;
	}

	if (approved) return <Deposit />;
	return <OpenAave />;
};

export default DepositScreen;
