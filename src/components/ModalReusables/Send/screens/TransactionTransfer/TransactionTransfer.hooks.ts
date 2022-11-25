/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react';
import {
	useAmplitude,
	useBiconomy,
	useNativeToken,
	useNavigation,
	useTransactions,
	useWalletManagement,
	useGlobalWalletState
} from '@hooks';
import { networks } from '@models/network';
import { convertTransactionResponse } from '@models/transaction';
import {
	estimateGas,
	sendTransaction,
	EstimateGasResponse,
	resolveDomainAddress,
	imageSource,
	sendTransactionData
} from '@models/wallet';
import { MinkeGasToken } from '@models/types/token.types';
import { decimalSeparator } from 'expo-localization';
import { approvalState } from '@models/deposit';
import { gaslessApproval, gaslessSend, sendContract } from '@models/gaslessTransaction';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import Logger from '@utils/logger';
import { captureEvent } from '@sentry/react-native';
import { toBn } from 'evm-bn';
import { POLYGON_GASLESS_TOKENS } from '@models/exchange';
import gasLimits from '@models/gas';
import { ResultProps } from '../../Send.types';

interface UserProps {
	name: string;
	address: string;
}

interface UseTransactionTransferProps {
	onDismiss: () => void;
	onError: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
	user: UserProps;
	token: MinkeGasToken;
}

export const useTransactionTransfer = ({
	onDismiss,
	sentSuccessfully,
	onError,
	user,
	token
}: UseTransactionTransferProps) => {
	const { track } = useAmplitude();
	const [image, setImage] = useState<{ uri: string }>();
	const [amount, onChangeAmount] = useState('');
	const [number, onChangeNumber] = useState<Number>();
	const [chainDefaultToken, setChainDefaultToken] = useState('');
	const [sending, setSending] = useState(false);
	const [gasPrice, setGasPrice] = useState<EstimateGasResponse>();
	const [amountType, setAmountType] = useState<'fiat' | 'token'>('fiat');
	const [enoughGas, setEnoughGas] = useState(true);
	const { addPendingTransaction } = useTransactions();
	const { gaslessEnabled, biconomy } = useBiconomy();
	const gasless = gaslessEnabled && POLYGON_GASLESS_TOKENS.includes(token.address.toLowerCase());
	const network = Object.values(networks).find((n) => n.chainId === token.chainId);
	const { balance } = useNativeToken(network);
	const navigation = useNavigation();
	const { canSendTransactions, needToChangeNetwork, walletConnect, connector } = useWalletManagement();

	useEffect(() => {
		const fetchGasPrice = async () => {
			const result = await estimateGas(network);
			setGasPrice(result);
			const {
				nativeToken: { symbol }
			} = network;
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
			const requiredGas = parseUnits(gasPrice?.result.ProposeGasPrice, 'gwei').mul(gasLimits.send);
			setEnoughGas(gasless || !!(balance && gasPrice ? balance.gte(requiredGas) : true));
		}
	}, [chainDefaultToken, gasPrice, balance]);

	useEffect(() => {
		if (
			!gasless &&
			token &&
			chainDefaultToken &&
			gasPrice?.result.ProposeGasPrice &&
			!!token.balance &&
			+token.balance > 0
		) {
			const isNativeToken = token.symbol === chainDefaultToken;
			if (isNativeToken) {
				const transactionPrice = +gasPrice.result.ProposeGasPrice * gasLimits.send; // gas price * gas limit
				const gasValueInEth = formatUnits(parseUnits(transactionPrice.toString(), 'gwei'));
				const newBalance = +token.balance - +gasValueInEth;
				token.balanceAvailableUSD = (newBalance * token.balanceUSD!) / +token.balance;
				token.balanceAvailable = String(newBalance);
			}
		}
	}, [gasPrice, token, chainDefaultToken]);

	const { address, privateKey } = useGlobalWalletState();

	const onBlockchainError = (e: any) => {
		Logger.error('Sending blockchain error', e);
		captureEvent(e);
		setSending(false);
		onError();
		onDismiss();
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

				const domain = user.address;
				const to = (await resolveDomainAddress(domain)) || domain;
				const amountToSend = tokenAmount.toString().replace(new RegExp(`\\${decimalSeparator}`), '.');

				onDismiss();
				if (gasless) {
					sentSuccessfully({
						token,
						hash: ''
					});
					const { id: networkId } = network;
					const { isApproved } = await approvalState(address, token.address, sendContract, networkId);
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
						token,
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
							network.id,
							contractAddress,
							token.decimals
						);

						const { from, value, data, to: addressTo, gasPrice: transactionGasPrice } = tx;
						hash = await connector.sendTransaction({
							from,
							to: addressTo,
							value: (value || toBn('0')).toHexString(),
							data: data || toBn('0').toHexString(),
							gasLimit: gasLimits.send.toString(),
							gasPrice: transactionGasPrice.toHexString()
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
							token,
							hash
						});
						const transaction = await sendTransaction(
							privateKey!,
							to,
							amountToSend,
							gas,
							network.id,
							contractAddress,
							token.decimals
						);
						hash = transaction.hash;
						// Pending transaction...
						addPendingTransaction(
							convertTransactionResponse({
								destination: to,
								transaction,
								amount: amountToSend,
								direction: 'outgoing',
								symbol: token.symbol
							})
						);
					}

					sentSuccessfully({
						token,
						hash
					});

					track('Sent', {
						token: token.symbol,
						tokenAmount,
						to,
						hash
					});
				}
				navigation.navigate('HomeScreen');
			} catch (error) {
				onBlockchainError(error);
			}
		}
	};

	const onMaxPress = (tokenValue = true) => {
		const { balance: tokenBalance = '0', balanceUSD = 0, balanceAvailable, balanceAvailableUSD } = token;
		if (tokenValue) {
			onChangeAmount((balanceAvailable || tokenBalance).replace(/\./g, decimalSeparator));
			onChangeNumber(Number(balanceAvailable || tokenBalance));
		} else {
			onChangeAmount((balanceAvailableUSD || balanceUSD).toString().replace(/\./g, decimalSeparator));
			onChangeNumber(balanceAvailableUSD || balanceUSD);
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
		onTypeChange,
		network
	};
};
