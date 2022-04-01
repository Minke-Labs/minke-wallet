import React from 'react';
import { Text } from '@components';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { useNativeToken } from '@hooks';
import CoinCard from './CoinCard/CoinCard';

const CoinSelector: React.FC<{ onSelect: Function }> = ({ onSelect }) => {
	const {
		network: { topUpToken }
	} = useState(globalWalletState()).value;
	const { nativeToken, name } = useNativeToken();

	return (
		<>
			<Text weight="extraBold" type="h3" marginBottom={8}>
				Add funds
			</Text>
			<Text marginBottom={32}>Choose which asset you&apos;d like to buy</Text>
			{nativeToken && (
				<CoinCard
					coin={{
						symbol: nativeToken.symbol,
						image: nativeToken.symbol.toLowerCase(),
						name: name!
					}}
					onSelect={onSelect}
				/>
			)}

			{topUpToken && (
				<CoinCard
					coin={{
						symbol: topUpToken.symbol,
						image: topUpToken.name.toLowerCase(),
						name: topUpToken.name
					}}
					description="USDC"
					onSelect={onSelect}
				/>
			)}
		</>
	);
};

export default CoinSelector;
