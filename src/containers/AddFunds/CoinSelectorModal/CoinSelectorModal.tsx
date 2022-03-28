import React, { useEffect } from 'react';
import { Text } from '@components';
import { network } from '@models/network';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import CoinCard from './CoinCard/CoinCard';

const CoinSelector: React.FC<{ onSelect: Function }> = ({ onSelect }) => {
	const {
		network: { nativeToken: token, topUpToken }
	} = useState(globalWalletState()).value;
	const [nativeToken, setNativeToken] = React.useState<{ symbol: string; name: string }>();
	useEffect(() => {
		const fetchDefaultToken = async () => {
			const { nativeToken: native } = await network();
			setNativeToken(native);
		};

		fetchDefaultToken();
	}, [token]);

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
						name: nativeToken.name
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
