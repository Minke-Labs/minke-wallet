import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { useAmplitude, useAuthentication, useTransactions } from '@hooks';
import { globalWalletState } from '@src/stores/WalletStore';
import { network } from '@models/network';
import { convertTransactionResponse } from '@models/transaction';
import { estimateGas, sendTransaction, EstimateGasResponse, resolveENSAddress, imageSource } from '@models/wallet';
import { ResultProps } from '@src/screens/WalletScreen/WalletScreen.types';
import { MinkeToken } from '@models/token';
import { decimalSeparator } from 'expo-localization';

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
	const [amountType, setAmountType] = React.useState<'fiat' | 'token'>('fiat');
	const { showAuthenticationPrompt } = useAuthentication();
	const { addPendingTransaction } = useTransactions();

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

	const onSend = () => {
		showAuthenticationPrompt({
			onSuccess: async () => {
				if (gasPrice && chainDefaultToken && number) {
					setSending(true);
					let tokenAmount = number;

					if (amountType === 'fiat') {
						// @ts-ignore
						tokenAmount = (Number(token.balance) * number) / token.balanceUSD;
					}

					const ens = user.address;
					const to = (await resolveENSAddress(ens)) || ens;
					const transaction = await sendTransaction(
						privateKey,
						to,
						tokenAmount.toString().replace(new RegExp(`\\${decimalSeparator}`), '.'),
						gasPrice.result.ProposeGasPrice,
						id,
						token.symbol.toLowerCase() === chainDefaultToken.toLowerCase() ? '' : token.address,
						token.decimals
					);
					const { wait, hash } = transaction;

					await wait();
					onDismiss();
					sentSuccessfully({
						symbol: token.symbol.toLowerCase(),
						link: hash
					});
					// Pending transaction...
					addPendingTransaction(
						convertTransactionResponse(transaction, amount, token.symbol, token.decimals)
					);
					//
					track('Send', {
						token: token.symbol,
						tokenAmount,
						to,
						hash
					});
				}
			}
		});
	};

	const onMaxPress = (tokenValue = true) => {
		if (tokenValue) {
			onChangeAmount(token.balance.replace(/\./g, decimalSeparator));
			onChangeNumber(Number(token.balance));
		} else {
			onChangeAmount(token.balanceUSD.toString().replace(/\./g, decimalSeparator));
			onChangeNumber(token.balanceUSD);
		}
	};

	const onTypeChange = (tokenValue: boolean) => {
		setAmountType(tokenValue ? 'token' : 'fiat');
		onChangeAmount('');
		onChangeNumber(undefined);
	};

	return {
		image,
		amount,
		number,
		gasPrice,
		sending,
		amountType,
		onChangeAmount,
		onChangeNumber,
		onSend,
		onMaxPress,
		onTypeChange
	};
};
