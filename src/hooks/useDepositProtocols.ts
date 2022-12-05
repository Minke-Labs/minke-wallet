import { useEffect, useState } from 'react';
import { DepositProtocol, fetchDepositProtocol, fetchMStablePoolData } from '@models/deposit';
import { networks } from '@models/network';
import { getAavePools } from '@src/services/apis/covalent/covalent';
import Logger from '@utils/logger';
import { MinkeToken } from '@models/types/token.types';
import useGlobalWalletState from './useGlobalWalletState';
import useDefaultStablecoin from './useDefaultStablecoin';

const useDepositProtocols = () => {
	const [protocol, setProtocol] = useState<DepositProtocol>();
	const [apy, setApy] = useState<string>();

	const {
		network: { chainId }
	} = useGlobalWalletState();
	const { defaultStablecoin } = useDefaultStablecoin();

	useEffect(() => {
		const fetchDefaultProtocol = async () => {
			setProtocol(await fetchDepositProtocol());
		};

		fetchDefaultProtocol();
	}, [chainId]);

	const fetchApy = async (selectedProtocol: DepositProtocol, token: MinkeToken) => {
		try {
			if (selectedProtocol.id === 'aave') {
				const pools = await getAavePools(token.chainId);
				const pool = pools.find(
					({ underlying }) => underlying.contract_ticker_symbol.toLowerCase() === token.symbol.toLowerCase()
				);
				if (pool) {
					return (pool.supply_apy * 100).toFixed(2);
				}
			} else {
				const poolData = await fetchMStablePoolData();
				const nw = Object.values(networks).find((n) => n.chainId === token?.chainId);
				const pool = poolData.pools.find(
					({ pair, chain }) => chain === nw.name.toLowerCase() && pair === 'imUSD'
				);
				if (pool) {
					return pool.apyDetails.yieldOnly.toFixed(2);
				}
			}
		} catch {
			Logger.log('Fetch APY  API failure');
		}

		return undefined;
	};

	useEffect(() => {
		const loadApy = async () => {
			if (protocol && defaultStablecoin) {
				setApy(await fetchApy(protocol, defaultStablecoin));
			}
		};

		loadApy();
	}, [protocol, defaultStablecoin?.address]);

	return {
		protocol,
		apy,
		fetchApy
	};
};

export default useDepositProtocols;
