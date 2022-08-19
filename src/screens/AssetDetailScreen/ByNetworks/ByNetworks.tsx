import React from 'react';
import { Text, Paper2 } from '@components';
import { TokenCard } from './TokenCard/TokenCard';

const ByNetworks = () => (
	<Paper2 br="xs" p="xs" mb="xs">
		<Text type="tMedium" weight="bold" mb="s">
			By networks
		</Text>
		<TokenCard
			token="usdc"
			name="USD Coin"
			symbol="USDC"
			subtitle="Polygon"
			rightValue="$512.08"
			mb="s"
		/>
		<TokenCard
			token="usdc"
			name="USD Coin"
			symbol="USDC"
			subtitle="Ethereum"
			rightValue="$134.08"
			mb="s"
		/>
		<TokenCard
			token="usdc"
			name="USD Coin"
			symbol="USDC"
			subtitle="BSC"
			rightValue="$0.00"
		/>
	</Paper2>
);

export default ByNetworks;
