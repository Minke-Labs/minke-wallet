import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { useAmplitude, useAuthentication, useBiconomy, useNativeToken, useTransactions } from '@hooks';
import { globalWalletState } from '@src/stores/WalletStore';
import { network } from '@models/network';
import { convertTransactionResponse } from '@models/transaction';
import { estimateGas, sendTransaction, EstimateGasResponse, resolveENSAddress, imageSource } from '@models/wallet';
import { ResultProps } from '@src/screens/WalletScreen/WalletScreen.types';
import { MinkeToken } from '@models/token';
import { decimalSeparator } from 'expo-localization';
import { approvalState } from '@models/deposit';
import { gaslessApproval, gaslessSend, sendContract } from '@models/gaslessTransaction';
import { parseUnits } from 'ethers/lib/utils';

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
	const [enoughGas, setEnoughGas] = React.useState(true);
	const { showAuthenticationPrompt } = useAuthentication();
	const { addPendingTransaction } = useTransactions();
	const { gaslessEnabled, biconomy } = useBiconomy();
	const gasless = gaslessEnabled && chainDefaultToken !== token.symbol;
	const { balance } = useNativeToken();

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

	useEffect(() => {
		if (chainDefaultToken && gasPrice?.result.ProposeGasPrice) {
			const requiredGas = parseUnits(gasPrice?.result.ProposeGasPrice, 'gwei');
			setEnoughGas(gasless || !!(balance && balance.gte(requiredGas)));
		}
	}, [chainDefaultToken, gasPrice, balance]);

	const {
		address,
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
					const amountToSend = tokenAmount.toString().replace(new RegExp(`\\${decimalSeparator}`), '.');

					if (gasless) {
						const { isApproved } = await approvalState(address, token.address, sendContract);

						if (!isApproved) {
							const tx = await gaslessApproval({
								address,
								biconomy,
								contract: token.address,
								privateKey,
								spender: sendContract
							});

							track('Approved for sending', { token: token.symbol, name: token.name, gasless: true });

							await biconomy.getEthersProvider().waitForTransaction(tx, 1);
						}

						const hash = await gaslessSend({
							biconomy,
							address,
							privateKey,
							amount: parseUnits(amountToSend, token.decimals).toString(),
							gasPrice: gasPrice.result.ProposeGasPrice,
							token: token.address,
							to
						});

						const { status, from: src } = await biconomy.getEthersProvider().waitForTransaction(hash);
						onDismiss();
						sentSuccessfully({
							symbol: token.symbol.toLowerCase(),
							link: hash
						});
						track('Sent', {
							token: token.symbol,
							tokenAmount,
							to,
							hash
						});
						addPendingTransaction({
							from: src,
							destination: to,
							hash,
							txSuccessful: status === 1,
							pending: true,
							timeStamp: new Date().getTime().toString(),
							amount: amountToSend,
							direction: 'outgoing',
							symbol: token.symbol
						});
					} else {
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
							convertTransactionResponse({
								transaction,
								amount: amountToSend,
								direction: 'outgoing',
								symbol: token.symbol
							})
						);

						track('Sent', {
							token: token.symbol,
							tokenAmount,
							to,
							hash
						});
					}
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
		gasless,
		enoughGas,
		onChangeAmount,
		onChangeNumber,
		onSend,
		onMaxPress,
		onTypeChange
	};
};
