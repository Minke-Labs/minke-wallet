import React from 'react';
import { Text, ListItem } from '@components';
import { useLanguage } from '@hooks';
import APay from '../APay';

interface SelectorModalProps {
	onBuy: () => void;
	onExchange: () => void;
}

export const SelectorModal: React.FC<SelectorModalProps> = ({ onBuy, onExchange }) => {
	const { i18n } = useLanguage();
	return (
		<>
			<Text marginBottom={16} weight="bold" type="hMedium">
				{i18n.t('Containers.AddFunds.SelectorModal.add_funds')}
			</Text>
			<ListItem
				tagType="svg"
				SvgComponent={APay}
				title={i18n.t('Containers.AddFunds.SelectorModal.buy_crypto')}
				desc={i18n.t('Containers.AddFunds.SelectorModal.apple_card_transfer')}
				onPress={onBuy}
			/>
			<ListItem
				title={i18n.t('Containers.AddFunds.SelectorModal.external')}
				desc={i18n.t('Containers.AddFunds.SelectorModal.send_from_exchange')}
				onPress={onExchange}
			/>
		</>
	);
};
