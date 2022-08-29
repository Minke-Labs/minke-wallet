import React from 'react';
import { Text, ListItem } from '@components';
import { useLanguage } from '@hooks';
import { os } from '@styles';
import APay from '../APay';
import GPay from '../GPay';

interface SelectorModalProps {
	onBuy: () => void;
	onExchange: () => void;
}

export const SelectorModal: React.FC<SelectorModalProps> = ({ onBuy, onExchange }) => {
	const { i18n } = useLanguage();
	return (
		<>
			<Text mb="xs" weight="bold" type="hMedium">
				{i18n.t('Containers.AddFunds.SelectorModal.add_funds')}
			</Text>
			{os === 'android' ? (
				<ListItem
					tagType="svg"
					SvgComponent={GPay}
					title={i18n.t('Containers.AddFunds.SelectorModal.buy_crypto')}
					desc={i18n.t('Containers.AddFunds.SelectorModal.apple_card_transfer', { pay: 'Google Pay' })}
					onPress={onBuy}
				/>
			) : (
				<ListItem
					tagType="svg"
					SvgComponent={APay}
					title={i18n.t('Containers.AddFunds.SelectorModal.buy_crypto')}
					desc={i18n.t('Containers.AddFunds.SelectorModal.apple_card_transfer', { pay: 'Apple Pay' })}
					onPress={onBuy}
				/>
			)}
			<ListItem
				title={i18n.t('Containers.AddFunds.SelectorModal.external')}
				desc={i18n.t('Containers.AddFunds.SelectorModal.send_from_exchange')}
				onPress={onExchange}
			/>
		</>
	);
};
