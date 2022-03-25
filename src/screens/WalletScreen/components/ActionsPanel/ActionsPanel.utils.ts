const actions = [
	{ name: 'Send', icon: 'sendStroke' },
	{ name: 'Exchange', icon: 'exchangeStroke' },
	{ name: 'Receive', icon: 'receiveStroke' },
	{ name: 'Copy address', icon: 'copyStroke' }
	// { name: 'Switch accounts', icon: 'avatarStroke' },
];

if (__DEV__) {
	actions.push({ name: 'New wallet', icon: 'walletStroke' });
	actions.push({ name: 'Delete wallet', icon: 'closeStroke' });
}

export { actions };
