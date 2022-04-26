export default {
	AccountsScreen: {
		import_or_restore: 'Import or Restore',
		accounts: 'Accounts'
	},
	AssetsScreen: {
		AboutCoin: {
			about: 'About'
		},
		Balance: {
			Balance: 'Balance',
			Buttons: {
				buy: 'Buy',
				sell: 'Sell',
				send: 'Send'
			}
		},
		MarketCap: {
			market_cap: 'MarketCap',
			volume: 'Volume (1D)'
		},
		Changes: {
			changes: 'Changes',
			hour: '1 Hour',
			day: '1 Day',
			week: '1 Week',
			month: '1 Month',
			year: '1 Year',
			all: 'All'
		},
		Chart: {
			'1H': '1H',
			'1D': '1D',
			'1W': '1W',
			'1M': '1M',
			'1Y': '1Y',
			All: 'All'
		}
	},
	WalletAssetsScreen: {
		header: 'Wallet',
		asset_header: 'Asset',
		ValueBox: {
			current_value: 'Current value'
		},
		Selector: {
			all_coins: 'All coins',
			stable_coins: 'Stable coins'
		},
		Card: {
			your_wallet_balance: 'Your wallet balance'
		}
	},
	SettingsScreen: {
		title: 'Settings',
		creating_wallet: 'Creating wallet',
		backup: 'Backup',
		currency: 'Currency',
		network: 'Network',
		new_wallet: 'New wallet',
		usd_coin: 'US Dollar coin',
		contact_support: 'Contact Support',
		switch_account: 'Switch account'
	},
	LoadingScreen: {
		this_can_take_a_few_seconds: 'This can take a few seconds'
	},
	WalletScreen: {
		Content: {
			transactions: 'Transactions',
			accounts: 'Accounts'
		},
		Header: {
			welcome: 'Welcome'
		},
		AssetsPanel: {
			your_total_assets: 'Your total assets',
			add_funds: 'Add Funds',
			save: 'Save'
		},
		ActionPanel: {
			send: 'Send',
			exchange: 'Exchange',
			receive: 'Receive',
			copy_address: 'Copy address',
			delete_wallet: 'Delete wallet',
			are_you_sure: 'Are you sure?',
			cancel: 'Cancel'
		},
		ModalsImport: {
			address_copied: 'Address copied!'
		},
		TransactionsTable: {
			today: 'Today',
			yesterday: 'Yesterday',
			this_month: 'This Month',
			see_all: 'See all'
		}
	},
	Transaction: {
		failed: 'Failed',
		view_on: 'View on',
		cancel: 'Cancel',
		adding_via_apple_pay: 'Adding via Apple Pay',
		swap: 'Swap %{source} to %{dest}',
		from: 'Received from',
		to: 'Sent to'
	},
	Accounts: {
		wallet: 'Wallet',
		available_funds_in_your_wallet: 'Available funds in your wallet',
		savings: 'Savings',
		funds_deposited_in_savings: 'Funds deposited in savings',
		borrowing: 'Borrowing',
		open_loans: 'Open loans',
		coming_soon: 'Coming soon'
	},
	TransactionsScreen: {
		transactions: 'Transactions',
		all: 'All',
		sent: 'Sent',
		received: 'Received'
	},
	BackupSettingsScreen: {
		title: 'Backup'
	},
	BackupStatusScreen: {
		your_wallet_is_backed_up: 'Your Wallet is Backed Up!',
		if_you_lose: 'If you lose this device you can recover your encrypted wallet backup from iCloud.',
		your_wallet_is_not_backed_up: 'Your Wallet is not Backed Up!',
		your_keys_your_coins: 'Your keys your coins. Backup your wallet incase of loss.',
		back_up_to_icloud: 'Back up to iCloud',
		backup: 'Backup',
		done: 'Done',
		go_to_wallet: 'Go to Wallet',
		view_secret_phrase: 'View Secret Phrase',
		backup_error: 'Backup error'
	},
	iCloudBackup: {
		BACKING_UP_WALLET: 'Backing up...',
		CREATING_WALLET: 'Creating wallet...',
		FETCHING_PASSWORD: 'Fetching Password...',
		IMPORTING_WALLET: 'Importing...',
		RESTORING_WALLET: 'Restoring...',
		errors: {
			KEYCHAIN_ACCESS_ERROR: 'You need to authenticate to proceed with the Backup process',
			ERROR_DECRYPTING_DATA: 'Incorrect password! Please try again.',
			NO_BACKUPS_FOUND: "We couldn't find your previous backup!",
			ERROR_GETTING_ENCRYPTED_DATA: "We couldn't access your backup at this time. Please try again later.",
			GENERIC_ERROR: 'Error while trying to backup. Error code: %{code}'
		}
	}
};
