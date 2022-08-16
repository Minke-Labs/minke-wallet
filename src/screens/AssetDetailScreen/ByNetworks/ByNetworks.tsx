import React from 'react';
import { Text, Paper2 } from '@components';
import { TokenCard } from './TokenCard/TokenCard';

const ByNetworks = () => (
	<Paper2 br={3} p={3} mb={3}>
		<Text type="tMedium" weight="bold" mb={4}>
			By networks
		</Text>
		<TokenCard
			token="usdc"
			name="USD Coin"
			symbol="USDC"
			subtitle="Polygon"
			rightValue="$512.08"
			mb={4}
		/>
		<TokenCard
			token="usdc"
			name="USD Coin"
			symbol="USDC"
			subtitle="Ethereum"
			rightValue="$134.08"
			mb={4}
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
