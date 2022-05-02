import i18n from '@localization';

const actions = [
	{ name: i18n.t('WalletScreen.ActionPanel.send'), icon: 'sendStroke' },
	{ name: i18n.t('WalletScreen.ActionPanel.exchange'), icon: 'exchangeStroke' },
	{ name: i18n.t('WalletScreen.ActionPanel.receive'), icon: 'receiveStroke' },
	{ name: i18n.t('WalletScreen.ActionPanel.copy_address'), icon: 'copyStroke' }
];

if (__DEV__) {
	actions.push({ name: i18n.t('WalletScreen.ActionPanel.delete_wallet'), icon: 'closeStroke' });
}

export { actions };
