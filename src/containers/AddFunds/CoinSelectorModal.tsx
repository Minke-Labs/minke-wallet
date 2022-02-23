import React from 'react';
import { Text } from '@components';
import CoinCard from './CoinCard';
import { coins } from '../../helpers/coins';

const CoinSelector: React.FC<{ onSelect: Function }> = ({ onSelect }) => (
	<>
		<Text weight="extraBold" type="h3" marginBottom={8}>
			Add funds
		</Text>
		<Text marginBottom={32}>Choose which asset you&apos;d like to buy</Text>
		<CoinCard coin={coins.ethereum} onSelect={onSelect} />
		<CoinCard coin={coins.dai} onSelect={onSelect} />
	</>
);

export default CoinSelector;
