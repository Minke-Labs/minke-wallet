import React from 'react';
import { Text, Paper, TokenItemCard } from '@components';
import { MinkeToken } from '@models/types/token.types';
import { useLanguage } from '@hooks';
import { stables } from '@models/depositTokens';
import { stablecoins } from '@models/token';
import { Network, networks } from '@models/network';

const ByNetworks = ({ fallback, tokens = [] }: { fallback: MinkeToken; tokens: MinkeToken[] }) => {
	const { i18n } = useLanguage();
	const productionChainIds = Object.values(networks)
		.filter((n) => !n.testnet)
		.map((n: Network) => n.chainId);
	const allNetworkStables = Object.values(stables)
		.map((s) => Object.values(s))
		.flat()
		.filter(
			(s) =>
				fallback.symbol === s.symbol && stablecoins.includes(s.symbol) && productionChainIds.includes(s.chainId)
		);

	const prodNetworks = allNetworkStables.map((n) => n.chainId);
	const foundNetworks = tokens.map((t) => t.chainId);
	const missing = prodNetworks.filter((x) => !foundNetworks.includes(x));
	missing.forEach((chainId) => {
		tokens.push({ ...fallback, ...{ chainId, balance: '0', balanceUSD: 0 } });
	});

	tokens.sort((first, second) => (second.balanceUSD || 0) - (first.balanceUSD || 0));

	return (
		<Paper pt="xs" ph="xs" mb="xs">
			<Text type="tMedium" weight="bold" mb="s">
				{i18n.t('Components.ByNetworks.by_networks')}
			</Text>
			{tokens.map((token) => (
				<TokenItemCard token={token} key={`${token.address}-${token.chainId}`} />
			))}
		</Paper>
	);
};

export default ByNetworks;
