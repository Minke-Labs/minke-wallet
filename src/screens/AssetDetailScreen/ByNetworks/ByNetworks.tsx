import React from 'react';
import { Text, Paper, TokenItemCard } from '@components';

const ByNetworks = () => (
	<Paper pt="xs" ph="xs" mb="xs">
		<Text type="tMedium" weight="bold" mb="s">
			By networks
		</Text>
		<TokenItemCard token="usdc" name="USD Coin" symbol="USDC" subtitle="Polygon" balanceUSD={512.08} />
		<TokenItemCard token="usdc" name="USD Coin" symbol="USDC" subtitle="Ethereum" balanceUSD={134.08} />
		<TokenItemCard token="usdc" name="USD Coin" symbol="USDC" subtitle="BSC" balanceUSD={0.001} mb="xs" />
	</Paper>
);

export default ByNetworks;
