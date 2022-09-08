import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	DepositProtocol,
	depositStablecoins,
	fetchDepositProtocol,
	fetchMStablePoolData,
	usdCoin
} from '@models/deposit';
import { getAavePools } from '@src/services/apis/covalent/covalent';
import { getDepositToken } from '@models/depositTokens';
import { network } from '@models/network';
import { MinkeToken } from '@models/types/token.types';
import { getTokenBalances } from '@src/services/apis';
import { DepositableToken } from '@models/types/depositTokens.types';
import DepositService from '@src/services/deposit/DepositService';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';

const useDepositProtocols = (withdraw = false) => {
	const [selectedProtocol, setSelectedProtocol] = useState<DepositProtocol>();
	const [selectedUSDCoin, setSelectedUSDCoin] = useState('');
	const [depositableToken, setDepositableToken] = useState<DepositableToken>();
	const [apy, setApy] = useState('');
	const [depositContract, setDepositContract] = useState('');
	const [ableToDeposit, setAbleToDeposit] = useState<boolean | undefined>();
	const [defaultToken, setDefaultToken] = useState<MinkeToken | null>();
	const [approved, setApproved] = useState<boolean | undefined>(); // transaction amount is approved?
	const { address } = useGlobalWalletState();

	const onChangeProtocol = async (protocol: DepositProtocol) => {
		await AsyncStorage.setItem('@depositProtocol', protocol.id);
		setSelectedProtocol(protocol);
	};

	const fetchSelectedProtocol = async () => {
		setSelectedProtocol(await fetchDepositProtocol());
	};

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
		const defaultUSDCoin = await usdCoin();
		const { depositableTokens: tokens, withdrawableTokens } = await getTokenBalances(address);
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
		const loadApproved = async () => {
			if (selectedProtocol) {
				const protocolApproved = await AsyncStorage.getItem(`@approved-${selectedProtocol.id}`);
				if (protocolApproved) {
					setApproved(true);
				} else if (depositableToken) {
					const { isApproved } = await new DepositService(selectedProtocol.id).approveState(
						address,
						depositableToken.address
					);
					setApproved(isApproved);
				}
			}
		};
		loadApproved();
	}, [depositableToken, selectedProtocol]);

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

	useEffect(() => {
		const updateApy = async () => {
			if (selectedProtocol && selectedUSDCoin) {
				try {
					if (selectedProtocol.id === 'aave') {
						const pools = await getAavePools();
						const pool = pools.find(
							({ underlying }) =>
								underlying.contract_ticker_symbol.toLowerCase() === selectedUSDCoin.toLowerCase()
						);
						if (pool) {
							setApy((pool.supply_apy * 100).toFixed(2));
						}
					} else {
						const { name } = await network();
						const poolData = await fetchMStablePoolData();
						const pool = poolData.pools.find(
							({ pair, chain }) => chain === name.toLowerCase() && pair === 'imUSD'
						);
						if (pool) {
							setApy(pool.apyDetails.yieldOnly.toFixed(2));
						}
					}
				} catch {
					setApy('0.00');
				}
			}
		};

		updateApy();
	}, [selectedProtocol, selectedUSDCoin]);

	return {
		selectedProtocol,
		apy,
		depositableToken,
		depositContract,
		ableToDeposit,
		defaultToken,
		approved,
		setApproved,
		onChangeProtocol,
		setSelectedUSDCoin
	};
};

export default useDepositProtocols;
