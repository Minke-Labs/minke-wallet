import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { useAmplitude } from '@hooks';
import { globalWalletState } from '@src/stores/WalletStore';
import { network } from '@models/network';
import { estimateGas, sendTransaction, EstimateGasResponse, resolveENSAddress, imageSource } from '@models/wallet';
import { ResultProps } from '@src/screens/WalletScreen/WalletScreen.types';
import { MinkeToken } from '@models/token';

interface UserProps {
	name: string;
	address: string;
}

interface UseTransactionTransferProps {
	onDismiss: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
	user: UserProps;
	token: MinkeToken;
}

export const useTransactionTransfer = ({ onDismiss, sentSuccessfully, user, token }: UseTransactionTransferProps) => {
	const { track } = useAmplitude();
	const state = useState(globalWalletState());
	const [image, setImage] = React.useState<{ uri: string }>();
	const [amount, onChangeAmount] = React.useState('');
	const [number, onChangeNumber] = React.useState<Number>();
	const [chainDefaultToken, setChainDefaultToken] = React.useState('');
	const [sending, setSending] = React.useState(false);
	const [gasPrice, setGasPrice] = React.useState<EstimateGasResponse>();

	useEffect(() => {
		const fetchGasPrice = async () => {
			const result = await estimateGas();
			setGasPrice(result);
			const {
				nativeToken: { symbol }
			} = await network();
			setChainDefaultToken(symbol);
		};

		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};

		fetchImage();
		fetchGasPrice();
	}, []);

	const {
		privateKey,
		network: { id }
	} = state.value;

	const onSend = async () => {
		if (gasPrice && chainDefaultToken) {
			setSending(true);
			const ens = user.address;
			const to = (await resolveENSAddress(ens)) || ens;
			const { wait, hash } = await sendTransaction(
				privateKey,
				to,
				amount,
				gasPrice.result.ProposeGasPrice,
				id,
				token.symbol.toLowerCase() === chainDefaultToken.toLowerCase() ? '' : token.address,
				token.decimals
			);
			await wait();
			onDismiss();
			sentSuccessfully({
				symbol: token.symbol.toLowerCase(),
				link: hash
			});
			track('Send', {
				token: token.symbol,
				amount,
				to,
				hash
			});
		}
	};

	return {
		image,
		amount,
		number,
		gasPrice,
		sending,
		onChangeAmount,
		onChangeNumber,
		onSend
	};
};