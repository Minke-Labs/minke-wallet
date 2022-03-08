import React from 'react';
import { View, FlatList } from 'react-native';
import { IconType } from '@styles';
import styles from './ActionsPanel.styles';
import { Card } from './Card/Card';
import { ActionsPanelProps } from './ActionsPanel.types';
import { arr } from './ActionsPanel.utils';

const ActionsPanel: React.FC<ActionsPanelProps> = ({
	setSendModalOpen,
	onCreateWallet,
	onDeleteWallet,
	onExchange,
	onSwitchAccounts,
	showReceive,
	onCopyToClipboard
}) => {
	const chooseFnc = (name: string) => {
		switch (name) {
			case 'Send':
				return setSendModalOpen;
			case 'Exchange':
				return onExchange;
			case 'Receive':
				return showReceive;
			case 'Copy address':
				return onCopyToClipboard;
			case 'New wallet':
				return onCreateWallet;
			case 'Switch accounts':
				return onSwitchAccounts;
			case 'Delete wallet':
				return onDeleteWallet;
			default:
				return () => {};
		}
	};

	return (
		<View style={styles.actionsPanelContainer}>
			<FlatList
				keyExtractor={(item, idx) => `${item.name}-${idx}`}
				data={arr}
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