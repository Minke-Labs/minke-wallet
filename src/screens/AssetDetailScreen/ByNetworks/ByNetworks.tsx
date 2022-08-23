import React from 'react';
import { Text, Paper2, TokenItemCard } from '@components';

const ByNetworks = () => (
	<Paper2 br="xs" pt="xs" ph="xs" mb="xs">
		<Text type="tMedium" weight="bold" mb="s">
			By networks
		</Text>
		<TokenItemCard
			token="usdc"
			name="USD Coin"
			symbol="USDC"
			subtitle="Polygon"
			rightValueUSD={512.08}
		/>
		<TokenItemCard
			token="usdc"
			name="USD Coin"
			symbol="USDC"
			subtitle="Ethereum"
			rightValueUSD={134.08}
		/>
		<TokenItemCard
			token="usdc"
			name="USD Coin"
			symbol="USDC"
			subtitle="BSC"
			rightValueUSD={0.001}
			mb="xs"
		/>
	</Paper2>
);

export default ByNetworks;
