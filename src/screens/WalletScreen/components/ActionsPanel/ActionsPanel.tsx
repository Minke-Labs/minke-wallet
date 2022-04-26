import React from 'react';
import { View, FlatList } from 'react-native';
import { IconType } from '@styles';
import i18n from '@localization';
import styles from './ActionsPanel.styles';
import { Card } from './Card/Card';
import { ActionsPanelProps } from './ActionsPanel.types';
import { actions } from './ActionsPanel.utils';

const ActionsPanel: React.FC<ActionsPanelProps> = ({
	setSendModalOpen,
	onDeleteWallet,
	onExchange,
	onSwitchAccounts,
	showReceive,
	onCopyToClipboard
}) => {
	const chooseFnc = (name: string) => {
		switch (name) {
			case i18n.t('WalletScreen.ActionPanel.send'):
				return setSendModalOpen;
			case i18n.t('WalletScreen.ActionPanel.exchange'):
				return onExchange;
			case i18n.t('WalletScreen.ActionPanel.receive'):
				return showReceive;
			case i18n.t('WalletScreen.ActionPanel.copy_address'):
				return onCopyToClipboard;
			case i18n.t('WalletScreen.ActionPanel.switch_accounts'):
				return onSwitchAccounts;
			case i18n.t('WalletScreen.ActionPanel.delete_wallet'):
				return onDeleteWallet;
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
