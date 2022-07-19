import React, { useEffect } from 'react';
import {
	useWalletState,
	useAmplitude,
	useBiconomy,
	useNativeToken,
	useNavigation,
	useTransactions,
	useWalletManagement
} from '@hooks';
import { network } from '@models/network';
import { convertTransactionResponse } from '@models/transaction';
import {
	estimateGas,
	sendTransaction,
	EstimateGasResponse,
	resolveENSAddress,
	imageSource,
	sendTransactionData
} from '@models/wallet';
import { ResultProps } from '@src/screens/WalletScreen/WalletScreen.types';
import { MinkeToken } from '@models/token';
import { decimalSeparator } from 'expo-localization';
import { approvalState } from '@models/deposit';
import { gaslessApproval, gaslessSend, sendContract } from '@models/gaslessTransaction';
import { parseUnits } from 'ethers/lib/utils';
import Logger from '@utils/logger';
import { captureEvent } from '@sentry/react-native';
import { toBn } from 'evm-bn';

interface UserProps {
	name: string;
	address: string;
}

interface UseTransactionTransferProps {
	onDismiss: () => void;
	onError: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
	user: UserProps;
	token: MinkeToken;
}

export const useTransactionTransfer = ({
	onDismiss,
	sentSuccessfully,
	onError,
	user,
	token
}: UseTransactionTransferProps) => {
	const { track } = useAmplitude();
	const [image, setImage] = React.useState<{ uri: string }>();
	const [amount, onChangeAmount] = React.useState('');
	const [number, onChangeNumber] = React.useState<Number>();
	const [chainDefaultToken, setChainDefaultToken] = React.useState('');
	const [sending, setSending] = React.useState(false);
	const [gasPrice, setGasPrice] = React.useState<EstimateGasResponse>();
	const [amountType, setAmountType] = React.useState<'fiat' | 'token'>('fiat');
	const [enoughGas, setEnoughGas] = React.useState(true);
	const { addPendingTransaction } = useTransactions();
	const { gaslessEnabled, biconomy } = useBiconomy();
	const gasless = gaslessEnabled && chainDefaultToken !== token.symbol;
	const { balance } = useNativeToken();
	const navigation = useNavigation();
	const { canSendTransactions, needToChangeNetwork, walletConnect, connector } = useWalletManagement();

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

	const { state } = useWalletState();
	const {
		address,
		privateKey,
		network: { id }
	} = state.value;

	const onBlockchainError = (e: any) => {
		Logger.error('Sending blockchain error', e);
		captureEvent(e);
		setSending(false);
		onDismiss();
		onError();
	};

	const onSend = async () => {
		if (gasPrice && chainDefaultToken && number && canSendTransactions) {
			setSending(true);

			try {
				let tokenAmount = number;

				if (amountType === 'fiat') {
					// @ts-ignore
					tokenAmount = (Number(token.balance) * number) / token.balanceUSD;
				}

				const ens = user.address;
				const to = (await resolveENSAddress(ens)) || ens;
				const amountToSend = tokenAmount.toString().replace(new RegExp(`\\${decimalSeparator}`), '.');

				onDismiss();
				if (gasless) {
					sentSuccessfully({
						token: {
							address: token.address,
							decimals: token.decimals,
							symbol: token.symbol
						},
						hash: ''
					});
					const { isApproved } = await approvalState(address, token.address, sendContract);
					const provider = biconomy.getEthersProvider();

					if (!isApproved) {
						const tx = await gaslessApproval({
							address,
							biconomy,
							contract: token.address,
							privateKey: privateKey!,
							spender: sendContract
						});

						track('Approved for sending', { token: token.symbol, name: token.name, gasless: true });

						await provider.waitForTransaction(tx);
					}

					const hash = await gaslessSend({
						biconomy,
						address,
						privateKey: privateKey!,
						amount: parseUnits(amountToSend, token.decimals).toString(),
						gasPrice: gasPrice.result.ProposeGasPrice,
						token: token.address,
						to
					});

					sentSuccessfully({
						token: {
							address: token.address,
							decimals: token.decimals,
							symbol: token.symbol
						},
						hash
					});
					track('Sent', {
						token: token.symbol,
						tokenAmount,
						to,
						hash
					});
					addPendingTransaction({
						from: address,
						destination: to,
						hash,
						txSuccessful: true,
						pending: true,
						timeStamp: (new Date().getTime() / 1000).toString(),
						amount: amountToSend,
						direction: 'outgoing',
						symbol: token.symbol
					});
				} else {
					const gas = gasPrice.result.ProposeGasPrice;
					const contractAddress =
						token.symbol.toLowerCase() === chainDefaultToken.toLowerCase() ? '' : token.address;
					let hash = '';
					if (walletConnect) {
						const tx = await sendTransactionData(
							address,
							to,
							amountToSend,
							gas,
							id,
							contractAddress,
							token.decimals
						);

						const { from, value, data, to: addressTo } = tx;
						hash = await connector.sendTransaction({
							from,
							to: addressTo,
							value: (value || toBn('0')).toHexString(),
							data: data || toBn('0').toHexString(),
							gasLimit: '100000'
						});

						addPendingTransaction({
							hash,
							txSuccessful: true,
							pending: true,
							timeStamp: (new Date().getTime() / 1000).toString(),
							amount: amountToSend.toString(),
							destination: to,
							from: address,
							direction: 'outgoing',
							symbol: token.symbol
						});
					} else {
						sentSuccessfully({
							token: {
								address: token.address,
								decimals: token.decimals,
								symbol: token.symbol
							},
							hash
						});
						const transaction = await sendTransaction(
							privateKey!,
							to,
							amountToSend,
							gas,
							id,
							contractAddress,
							token.decimals
						);
						hash = transaction.hash;
						// Pending transaction...
						addPendingTransaction(
							convertTransactionResponse({
								transaction,
								amount: amountToSend,
								direction: 'outgoing',
								symbol: token.symbol
							})
						);
					}

					sentSuccessfully({
						token: {
							address: token.address,
							decimals: token.decimals,
							symbol: token.symbol
						},
						hash
					});

					track('Sent', {
						token: token.symbol,
						tokenAmount,
						to,
						hash
					});
				}
				navigation.navigate('WalletScreen');
			} catch (error) {
				onBlockchainError(error);
			}
		}
	};

	const onMaxPress = (tokenValue = true) => {
		if (tokenValue) {
			onChangeAmount(token.balance!.replace(/\./g, decimalSeparator));
			onChangeNumber(Number(token.balance));
		} else {
			onChangeAmount(token.balanceUSD!.toString().replace(/\./g, decimalSeparator));
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
		canSendTransactions,
		needToChangeNetwork,
		onChangeAmount,
		onChangeNumber,
		onSend,
		onMaxPress,
		onTypeChange
	};
};
