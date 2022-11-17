import React from 'react';
import { Text, Paper, TokenItemCard } from '@components';

const ByNetworks = () => (
	<Paper pt="xs" ph="xs" mb="xs">
		<Text type="tMedium" weight="bold" mb="s">
			By networks
		</Text>
		<TokenItemCard token={{ symbol: 'USDC', address: '', decimals: 0, chainId: 0 }} />
		<TokenItemCard token={{ symbol: 'USDC', address: '', decimals: 0, chainId: 0 }} />
		<TokenItemCard token={{ symbol: 'USDC', address: '', decimals: 0, chainId: 0 }} />
	</Paper>
);

export default ByNetworks;
