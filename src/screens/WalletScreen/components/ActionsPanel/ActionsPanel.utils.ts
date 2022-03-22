const actions = [
	{ name: 'Send', icon: 'sendStroke' },
	{ name: 'Exchange', icon: 'exchangeStroke' },
	{ name: 'Receive', icon: 'receiveStroke' },
	{ name: 'Copy address', icon: 'copyStroke' },
	// { name: 'Switch accounts', icon: 'avatarStroke' },
	{ name: 'Delete wallet', icon: 'closeStroke' }
];

if (__DEV__) {
	actions.push({ name: 'New wallet', icon: 'walletStroke' });
}

export { actions };
