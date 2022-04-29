/* eslint-disable max-len */
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
	BackupToICloudScreen: {
		CreateBackupPassword: {
			choose_password: 'Choose a password',
			memorable_password: 'Please choose a password you’ll remember.',
			not_recoverable: 'It can’t be recovered!'
		},
		ConfirmBackupPassword: {
			enter_backup_password: 'Enter Backup Password',
			to: 'To',
			restore_from: 'restore your wallets from',
			add_to: 'add this wallet to',
			enter_existing: 'your iCloud backup, enter your existing backup password'
		}
	},
	ChangeCurrencyScreen: {
		header_title: 'Change Currency'
	},
	ChangeNetworkScreen: {
		ListItem: {
			test_network: 'test network'
		}
	},
	DepositScreen: {
		NotAbleToSaveModal: {
			not_able: 'Not able to save',
			need_funds_in: 'First you need to have funds in ',
			add_funds: 'Add funds',
			exchange: 'Exchange'
		}
	},
	DepositWithdrawalSuccessScreen: {
		congrats: 'Congrats!',
		you_deposited: 'You\'ve made your deposit!',
		you_withdrawed: 'You\'ve withdrawed successfully!'
	},
	ExchangeResumeScreen: {
		exchange_resume: 'Exchange Resume',
		rate_fixed_for: 'Rate fixed for:',
		rate: 'Rate',
		swapping_via: 'Swapping via'
	},
	ExchangeScreen: {
		fetching: 'Fetching...',
		exchange: 'Exchange',
		GasSelector: {
			GasOption: {
				transaction_fee: 'Transaction Fee'
			}
		}
	},
	ManualBackupScreen: {
		done: 'Done',
		recovery_phrase: 'Recovery phrase',
		write_this_down: 'Write this down on paper or save it in your password manager.',
		address_copied: 'Address copied!',
		Warning: {
			minke_will_never_ask: 'Minke will never ask for these words',
			anyone_who_has_these: 'Anyone who has these can access your wallet!'
		}
	},
	SaveScreen: {
		interest: '% interest p.a.',
		EmptyState: {
			save: 'Save',
			open_aave_savings_account: 'Open Aave\nSavings Account',
			lets_make_first_deposit: 'Let\'s make your first deposit?'
		},
		Header: {
			save: 'Save'
		},
		CurrentValue: {
			current_deposits: 'Current deposits',
			withdraw: 'Withdraw',
			deposit: 'Deposit'
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
	TopUpWaitScreen: {
		Failed: {
			something_gone_wrong: 'Oh no! Something has gone wrong. Please try again later or contact the support.',
			reference: 'Reference: '
		},
		Processing: {
			almost_there: 'Almost there... this might take a minute...',
			please_wait: 'Please wait while we process your payment...'
		},
		Success: {
			funds_being_deposited: 'Your funds are being deposited into your wallet...'
		}
	},
	TransactionsScreen: {
		transactions: 'Transactions',
		all: 'All',
		sent: 'Sent',
		received: 'Received'
	},
	USDCoinScreen: {
		usd_asset: 'USD Asset'
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
	WalletCreatedScreen: {
		wallet_created: 'Wallet Created!',
		need_backup: 'You need to create a backup of your wallet. Keep your backup safe as losing it could mean a loss of funds.',
		modal_error: 'Backup error'
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
		},
		screens: {
			Transactions: {
				NoTransactionsYet: {
					no_transactions_here: 'No transactions here',
					lets_get_started: 'Let\'s get started?'
				}
			}
		},
		Modals: {
			SendModal: {
				components: {
					Card: {
						available: ' Available'
					},
					GasPriceLine: {
						speed: 'Speed: ',
						network_fee: ' Network fee'
					}
				},
				screens: {
					AddContact: {
						add_contact: 'Add Contact'
					},
					TransactionContacts: {
						sent_to_address: 'Send to an address',
						address_or_ens: 'Address or ENS',
						choose_from_saved: 'Or choose from a saved address',
						NoContactsYet: {
							no_contacts_yet: 'No contacts yet',
							add_some: 'Add some to start'
						}
					},
					TransactionSelectFunds: {
						which: 'Which ',
						asset: 'asset ',
						want_to_send: 'do you want to send to ',
						Card: {
							available: ' Available'
						}
					},
					TransactionTransfer: {
						how_much: 'How much ',
						wanna_send: ' do you want to send?'
					}
				}
			}
		}
	},
	WelcomeScreen: {
		wave_goodbye: 'Wave goodbye to your bank!',
		easily: 'Easily save, spend and invest with',
		creating: 'Creating wallet',
		create: 'Create Wallet',
		import_or_restore: 'Import or Restore Wallet',
		ImportWalletModal: {
			add_wallet: 'Add Wallet',
			seed_or_key: 'Seed phrase or private key',
			importing: 'Importing wallet',
			import: 'Import Wallet'
		}
	},
	WithdrawScreen: {
		withdraw: 'Withdraw',
		balance: 'Balance: '
	},

	LoadingScreen: {
		this_can_take_a_few_seconds: 'This can take a few seconds'
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
	},
	CopyButton: {
		copy_to_clipboard: 'Copy to clipboard'
	},

	Components: {
		NetworkWarning: {
			NetworkTag: {
				sending_on: 'Sending on the {{network}} network'
			}
		},
		EmptyStates: {
			NoTokens: {
				no_tokens_here: 'No tokens here'
			}
		},
		Inputs: {
			enter_password: 'Enter password',
			repeat_password: 'Repeat password',
			search: 'Search',
			search_token: 'Search token',
			name: 'Name',
			ens_or_wallet: 'ENS or Wallet Address'
		},
		Buttons: {
			backup_to_icloud: 'Back up to iCloud',
			backup_manually: 'Back up manually',
			confirm_restore: 'Confirm restore',
			confirm_backup: 'Confirm backup',
			done: 'Done',
			exchange: 'Exchange',
			deposit: 'Deposit',
			withdraw: 'Withdraw',
			ok_got_it: 'OK, got it',
			send: 'Send',
			add_contact: 'Add Contact',
			add_funds_to_start: 'Add funds to start'
		},
		ModalReusables: {
			Error: {
				description: 'Something went wrong, our developers have been notified.',
				buttonLabel: 'Ok, got it'
			}
		},
		SettingsHeader: {
			done: 'Done'
		},
		TokenCard: {
			choose_token: 'Choose token'
		}
	},

	Logs: {
		couldnt_restore_backup: 'We could not restore your backups',
		not_enough_balance_for_gas: 'Not enough balance for gas'
	}
};
