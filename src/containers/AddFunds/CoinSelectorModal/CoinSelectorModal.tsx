import React from 'react';
import { Text } from '@components';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { useNativeToken, useLanguage } from '@hooks';
import CoinCard from './CoinCard/CoinCard';

const CoinSelectorModal: React.FC<{ onSelect: Function }> = ({ onSelect }) => {
	const {
		network: { topUpToken }
	} = useState(globalWalletState()).value;
	const { nativeToken, name } = useNativeToken();
	const { i18n } = useLanguage();
	return (
		<>
			<Text weight="extraBold" type="h3" marginBottom={8}>
				{i18n.t('Containers.AddFunds.CoinSelectorModal.add_funds')}
			</Text>
			<Text marginBottom={32}>
				{i18n.t('Containers.AddFunds.CoinSelectorModal.choose_asset')}
			</Text>

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

export default CoinSelectorModal;
