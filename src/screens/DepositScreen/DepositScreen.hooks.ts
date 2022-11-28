import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useState } from '@hookstate/core';
import { MinkeToken } from '@models/types/token.types';
import { globalExchangeState } from '@stores/ExchangeStore';
import { DepositProtocol, fetchDepositProtocol, fetchMStablePoolData } from '@models/deposit';
import {
	useNavigation,
	useBalances,
	useAmplitude,
	useBiconomy,
	useNativeToken,
	useTransactions,
	useWalletManagement,
	useGlobalWalletState
} from '@hooks';
import Logger from '@utils/logger';
import { toBn } from 'evm-bn';
import { formatUnits } from 'ethers/lib/utils';
import Deposit from '@src/services/deposit/DepositService';
import { captureException } from '@sentry/react-native';
import { constants } from 'ethers';
import gasLimits, { Networks } from '@models/gas';
import { getAavePools } from '@src/services/apis/covalent/covalent';
import { Network, networks } from '@models/network';
import { getDepositToken } from '@models/depositTokens';

export const useDepositScreen = () => {
	const [token, setToken] = React.useState<MinkeToken>();
	const [amount, setAmount] = React.useState('0');
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [blockchainError, setBlockchainError] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [depositProtocolSearch, setDepositProtocolSearch] = React.useState(false);
	const [depositProtocol, setDepositProtocol] = React.useState<DepositProtocol>();
	const [apy, setApy] = React.useState<string>();
	const { addPendingTransaction } = useTransactions();
	const { canSendTransactions, needToChangeNetwork, walletConnect, connector } = useWalletManagement();
	const { biconomy, gaslessEnabledMatic } = useBiconomy();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { stablecoins = [] } = useBalances();
	const { address, privateKey } = useGlobalWalletState();
	const network = Object.values(networks).find((n) => n.chainId === token?.chainId);
	const gaslessEnabled = gaslessEnabledMatic && network?.chainId === networks.matic.chainId;
	const { balance } = useNativeToken(network);
	const { gas } = useState(globalExchangeState()).value;
	const { maxFeePerGas = constants.Zero, maxPriorityFeePerGas = constants.Zero } = gas || {};

	const updateAmount = (value: string) => {
		const formatedValue = value.replace(/,/g, '.');
		if (!formatedValue || (!formatedValue.endsWith('.') && !formatedValue.startsWith('.'))) {
			setAmount(formatedValue);
		}
	};

	const gasUnits = depositProtocol && network ? gasLimits[network.id as Networks].deposit[depositProtocol.id] : 1;
	const enoughForGas =
		(gaslessEnabledMatic && network?.chainId === networks.matic.chainId) ||
		(balance && maxFeePerGas ? balance.gte(maxFeePerGas.mul(gasUnits)) : true);
	const canDeposit =
		depositProtocol &&
		token &&
		token.balance &&
		+amount > 0 &&
		+token.balance >= +amount &&
		enoughForGas &&
		(gaslessEnabled || !maxFeePerGas.isZero()); // if gasless we dont need a gwei value

	const onDeposit = async () => {
		Keyboard.dismiss();
		if (canDeposit && depositProtocol && token) {
			const nw: Network = Object.values(networks).find((n) => n.chainId === token.chainId);
			let depositableToken = getDepositToken(nw.id, token.symbol, depositProtocol.id);
			if (depositProtocol.id === 'mstable') {
				const { address: defaultAddress, symbol, decimals } = token;
				depositableToken = { ...depositableToken, ...{ address: defaultAddress, symbol, decimals } };
			}

			if (depositableToken) {
				setWaitingTransaction(true);
				try {
					const hash = await new Deposit(depositProtocol.id).deposit({
						address,
						privateKey,
						amount: formatUnits(toBn(amount, token.decimals), 'wei'),
						minAmount: formatUnits(toBn((Number(amount) * 0.97).toString(), token.decimals), 'wei'),
						maxFeePerGas,
						maxPriorityFeePerGas,
						depositableToken,
						gasless: gaslessEnabled,
						biconomy,
						walletConnect,
						connector
					});

					if (hash) {
						Logger.log(`Deposit ${JSON.stringify(hash)}`);
						setTransactionHash(hash);
						track('Deposited', {
							token: token.symbol,
							amount,
							hash,
							gasless: gaslessEnabled
						});
						addPendingTransaction({
							from: token.address,
							destination: address,
							hash,
							txSuccessful: true,
							pending: true,
							timeStamp: (new Date().getTime() / 1000).toString(),
							amount,
							direction: 'exchange',
							symbol: token.symbol,
							subTransactions: [
								{ type: 'outgoing', symbol: token.symbol, amount: +amount },
								{
									type: 'incoming',
									symbol: depositableToken.interestBearingToken.symbol,
									amount: +amount
								}
							],
							chainId: network.chainId
						});
						navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' });
					} else {
						Logger.error('Error depositing');
					}
					setWaitingTransaction(false);
				} catch (error) {
					setWaitingTransaction(false);
					captureException(error);
					Logger.error('Deposit blockchain error', error);
					setBlockchainError(true);
				}
			}
		}
	};

	const showModal = () => {
		Keyboard.dismiss();
		setSearchVisible(true);
	};

	const hideModal = () => {
		Keyboard.dismiss();
		setSearchVisible(false);
	};

	const onTokenSelect = async (selectedToken: MinkeToken) => {
		hideModal();
		setToken(selectedToken);
	};

	const onChangeDepositProtocol = (p: DepositProtocol) => {
		setDepositProtocol(p);
		setDepositProtocolSearch(false);
	};

	const fetchSelectedProtocol = async () => {
		setDepositProtocol(await fetchDepositProtocol());
	};

	useEffect(() => {
		fetchSelectedProtocol();
	}, []);

	useEffect(() => {
		if (token && depositProtocol && !depositProtocol.chainIds.includes(token.chainId)) {
			setToken(undefined);
		}
	}, [depositProtocol]);

	useEffect(() => {
		const updateApy = async () => {
			if (depositProtocol && token) {
				try {
					if (depositProtocol.id === 'aave') {
						const pools = await getAavePools(token.chainId);
						const pool = pools.find(
							({ underlying }) =>
								underlying.contract_ticker_symbol.toLowerCase() === token.symbol.toLowerCase()
						);
						if (pool) {
							setApy((pool.supply_apy * 100).toFixed(2));
						}
					} else {
						const poolData = await fetchMStablePoolData();
						const nw = Object.values(networks).find((n) => n.chainId === token?.chainId);
						const pool = poolData.pools.find(
							({ pair, chain }) => chain === nw.name.toLowerCase() && pair === 'imUSD'
						);
						if (pool) {
							setApy(pool.apyDetails.yieldOnly.toFixed(2));
						}
					}
				} catch {
					setApy(undefined);
				}
			} else {
				setApy(undefined);
			}
		};

		updateApy();
	}, [depositProtocol, token]);

	return {
		token,
		updateAmount,
		canDeposit,
		onDeposit,
		waitingTransaction,
		transactionHash,
		enoughForGas,
		gaslessEnabled,
		searchVisible,
		hideModal,
		showModal,
		onTokenSelect,
		tokens: stablecoins.filter(({ chainId }) => (depositProtocol?.chainIds || []).includes(chainId)),
		depositProtocol,
		setDepositProtocol,
		blockchainError,
		setBlockchainError,
		canSendTransactions,
		needToChangeNetwork,
		gasUnits,
		depositProtocolSearch,
		setDepositProtocolSearch,
		onChangeDepositProtocol,
		apy,
		network
	};
};
