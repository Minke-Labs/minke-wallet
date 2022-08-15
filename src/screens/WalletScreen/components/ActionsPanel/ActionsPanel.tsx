import React from 'react';
import { View, FlatList } from 'react-native';
import { IconType } from '@styles';
import { useLanguage } from '@hooks';
import styles from './ActionsPanel.styles';
import { Card } from './Card/Card';
import { ActionsPanelProps } from './ActionsPanel.types';

const ActionsPanel: React.FC<ActionsPanelProps> = ({
	setSendModalOpen,
	onExchange,
	onSwitchAccounts,
	showReceive
}) => {
	const { i18n } = useLanguage();

	const actions = [
		{ name: i18n.t('WalletScreen.ActionPanel.send'), icon: 'send' },
		{ name: i18n.t('WalletScreen.ActionPanel.exchange'), icon: 'exchangeStroke' },
		{ name: i18n.t('WalletScreen.ActionPanel.receive'), icon: 'receive' }
	];

	const chooseFnc = (name: string) => {
		switch (name) {
			case i18n.t('WalletScreen.ActionPanel.send'):
				return setSendModalOpen;
			case i18n.t('WalletScreen.ActionPanel.exchange'):
				return onExchange;
			case i18n.t('WalletScreen.ActionPanel.receive'):
				return showReceive;
			case i18n.t('WalletScreen.ActionPanel.switch_accounts'):
				return onSwitchAccounts;
			default:
				return () => {};
		}
	};
	return (
		<View style={styles.actionsPanelContainer}>
			<FlatList
				keyExtractor={(item, idx) => `${item.name}-${idx}`}
				data={actions}
				renderItem={({ item }) => (
					<Card onPress={chooseFnc(item.name)} name={item.name} icon={item.icon as IconType} />
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default ActionsPanel;
