import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DepositProtocol, depositStablecoins, fetchDepositProtocol, usdCoin } from '@models/deposit';
import { getDepositToken } from '@models/depositTokens';
import { network } from '@models/network';
import { MinkeToken } from '@models/types/token.types';
import { useState } from '@hookstate/core';
import { DepositableToken } from '@models/types/depositTokens.types';
import { globalDepositState } from '@stores/DepositStore';
import useBalances from './useBalances';

const useDepositProtocols = (withdraw = false) => {
	const [selectedProtocol, setSelectedProtocol] = React.useState<DepositProtocol>();
	const [selectedUSDCoin, setSelectedUSDCoin] = React.useState('');
	const [depositableToken, setDepositableToken] = React.useState<DepositableToken>();
	const [depositContract, setDepositContract] = React.useState('');
	const [ableToDeposit, setAbleToDeposit] = React.useState<boolean | undefined>();
	const [defaultToken, setDefaultToken] = React.useState<MinkeToken | null>();
	const depositState = useState(globalDepositState());
	const { stablecoins: tokens, withdrawableTokens } = useBalances();

	const onChangeProtocol = async (protocol: DepositProtocol) => {
		await AsyncStorage.setItem('@depositProtocol', protocol.id);
		depositState.set(protocol);
		setSelectedProtocol(protocol);
	};

	const fetchSelectedProtocol = async () => {
		setSelectedProtocol(await fetchDepositProtocol());
	};

	// @TODO: Marcos (this concept needs to change. All tokens from all networks are depositable)
	const fetchDepositToken = async () => {
		if (selectedUSDCoin && selectedProtocol && defaultToken) {
			const { id } = await network();
			let token = getDepositToken(id, selectedUSDCoin, selectedProtocol.id);
			if (selectedProtocol.id === 'mstable') {
				const { address: defaultAddress, symbol, decimals } = defaultToken;
				token = { ...token, ...{ address: defaultAddress, symbol, decimals } };
			}
			setDepositableToken(token);
		}
	};

	const checkAbleToDeposit = async () => {
		const defaultUSDCoin = selectedUSDCoin;
		const sourceTokens = withdraw ? withdrawableTokens : tokens;
		let token = sourceTokens.find((t) => t.symbol === defaultUSDCoin);
		const hasTheDefaultToken = !!token;
		if (hasTheDefaultToken) {
			setAbleToDeposit(true);
			setDefaultToken(token);
			return;
		}

		token = sourceTokens.reverse().find((t) => depositStablecoins.includes(t.symbol)) || ({} as MinkeToken);

		const { symbol } = token;
		if (symbol) {
			setSelectedUSDCoin(symbol);
			setAbleToDeposit(true);
			setDefaultToken(token);
			return;
		}

		setAbleToDeposit(false);
		setDefaultToken(null);
	};

	const getDefaultUSDCoin = async () => {
		setSelectedUSDCoin(await usdCoin());
	};

	useEffect(() => {
		getDefaultUSDCoin();
		fetchSelectedProtocol();
	}, []);

	useEffect(() => {
		const fetchDepositContract = async () => {
			if (selectedProtocol) {
				if (selectedProtocol.id === 'aave') {
					const {
						aave: { depositContract: aaveDepositContract }
					} = await network();
					setDepositContract(aaveDepositContract);
				} else {
					const { mStable } = await network();
					if (mStable) setDepositContract(mStable.depositContract);
				}
			}
		};

		fetchDepositContract();
	}, [selectedProtocol]);

	useEffect(() => {
		checkAbleToDeposit();
	}, [selectedUSDCoin]);

	useEffect(() => {
		fetchDepositToken();
	}, [selectedUSDCoin, selectedProtocol, defaultToken]);

	return {
		selectedProtocol,
		depositableToken,
		depositContract,
		ableToDeposit,
		defaultToken,
		onChangeProtocol,
		setSelectedUSDCoin
	};
};

export default useDepositProtocols;
