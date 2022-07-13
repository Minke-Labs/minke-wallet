import React from 'react';
import { Text, ListItem } from '@components';
import APay from './APay.svg';

interface SelectorModalProps {
	onBuy: () => void;
	onExchange: () => void;
}

export const SelectorModal: React.FC<SelectorModalProps> = ({ onBuy, onExchange }) => (
	<>
		<Text
			marginBottom={16}
			weight="bold"
			type="hMedium"
		>
			Add funds
		</Text>
		<ListItem
			tagType="svg"
			SvgComponent={APay}
			title="Buy crypto"
			desc="Apple Pay, card or bank transfer"
			onPress={onBuy}
		/>
		<ListItem
			title="External exchange"
			desc="Apple Pay, card or bank transfer"
			onPress={onExchange}
		/>
	</>
);
