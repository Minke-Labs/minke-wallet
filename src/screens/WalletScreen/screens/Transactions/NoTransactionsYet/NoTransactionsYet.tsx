import React from 'react';
import { whale2Img } from '@images';
import { Text, Button } from '@components';
import { View, Image } from 'react-native';
import i18n from '@localization';
import styles from './NoTransactionsYet.styles';
import { NoTransactionsYetProps } from './NoTransactionsYet.types';

export const NoTransactionsYet: React.FC<NoTransactionsYetProps> = ({ onAddFunds }) => (
	<View style={styles.container}>
		<Image source={whale2Img} style={styles.image} />
		<Text color="text4" weight="medium" marginBottom={16}>
			{i18n.t('WalletScreen.screens.Transactions.NoTransactionsYet.no_transactions_here')}
		</Text>
		<Text color="text3" weight="bold" marginBottom={64}>
			{i18n.t('WalletScreen.screens.Transactions.NoTransactionsYet.lets_get_started')}
		</Text>
		<Button
			onPress={onAddFunds}
			iconLeft="addStroke"
			title={i18n.t('Components.Buttons.add_funds_to_start')}
			marginBottom={14}
		/>
	</View>
);
