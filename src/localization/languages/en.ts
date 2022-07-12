/* eslint-disable max-len */
export default {
	AvatarContext: {
		KrakenJr: {
			name: 'Kraken Jr.',
			desc: 'Friendly Octopus from the US that is constantly chasing new coins.'
		},
		DeShark: {
			name: 'DeShark',
			desc: 'The Australian shark that loves navigating the waters of DeFi.'
		},
		Mateus: {
			name: 'Mateus',
			desc: 'Bright Brazilian anglerfish saving on stablecoins.'
		},
		Fugu: {
			name: 'Fugu',
			desc: 'Blowfish from Japan new to crypto but constantly learning.'
		},
		WowFish: {
			name: 'Wow Fish',
			desc: 'German goldfish looking for sustainable yields.'
		}
	},
	LocationContext: {
		US: {
			name: 'United States',
			currencyName: 'United States Dollar'
		},
		EU: {
			name: 'European Union',
			currencyName: 'Euro'
		},
		UK: {
			name: 'United Kingdom',
			currencyName: 'British Pound'
		},
		AU: {
			name: 'Australia',
			currencyName: 'Australian Dollar'
		},
		CA: {
			name: 'Canada',
			currencyName: 'Canadian Dollar'
		},
		BR: {
			name: 'Brazil',
			currencyName: 'Brazilian Real'
		},
		TUR: {
			name: 'Turkey',
			currencyName: 'Turkish Lira'
		}
	},
	AccountsScreen: {
		import_or_restore: 'Import or Restore',
		accounts: 'Accounts'
	},
	AssetsScreen: {
		AboutCoin: {
			about: 'About '
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
		Upper: {
			Chart: {
				Changes: {
					changes: 'Changes',
					hour: '1 Hour',
					day: '1 Day',
					week: '1 Week',
					month: '1 Month',
					year: '1 Year',
					all: 'All'
				},
				Selection: {
					Chart: {
						'1H': '1H',
						'1D': '1D',
						'1W': '1W',
						'1M': '1M',
						'1Y': '1Y',
						All: 'All'
					}
				}
			}
		}
	},
	BackupSettingsScreen: {
		title: 'Backup'
	},
	BackupStatusScreen: {
		your_wallet_is_backed_up: 'Your Wallet is Backed Up!',
		if_you_lose: 'If you lose this device you can recover your encrypted wallet backup from {{cloudPlatform}}.',
		your_wallet_is_not_backed_up: 'Your Wallet is not Backed Up!',
		your_keys_your_coins: 'Your keys your coins. Backup your wallet incase of loss.',
		back_up_to_icloud: 'Back up to {{cloudPlatform}}',
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
			restore_from: ' restore your wallets from ',
			add_to: ' add this wallet to ',
			enter_existing: 'your {{cloudPlatform}} backup, enter your existing backup password',
			importing_backups: 'Importing backups'
		}
	},
	ChangeCountryScreen: {
		header_title: 'Change Country'
	},
	ChangeLanguageScreen: {
		header_title: 'Change Language'
	},
	ChangeNetworkScreen: {
		header_title: 'Network',
		ListItem: {
			test_network: 'test network'
		}
	},
	DepositScreen: {
		Congrats: {
			congrats: 'Congrats',
			you_just: "You've made your first deposit!",
			done: 'Done'
		},
		Deposit: {
			deposit: 'Deposit',
			balance: 'Balance: '
		},
		OpenSavings: {
			open_account: 'Open Account',
			aave: 'Open Aave\nSavings Account',
			mstable: 'Open mStable\nSavings Account',
			this_transaction: 'This transaction will cost a few cents.'
		},
		OpenMStable: {
			open_account: 'Open Account',
			open_mstable: 'Open mStable\nSavings Account',
			what_is: 'What is mStable?',
			mstable_des:
				'mStable is an autonomous and non-custodial infrastructure for pegged-value crypto assets. The protocol was created to address three major problems: \n\n- Significant fragmentation in same-peg crypto assets (there are currently at least 5 major USD pegged crypto assets on Ethereum, for example). \n\n - Lack of yield in fiat currencies and pegged crypto assets. \n\n - Lack of protection against permanent capital loss in pegged crypto assets.',
			view_site: 'View Site',
			learn_more: 'Learn More',
			this_transaction: 'This transaction will cost a few cents.'
		},
		NotAbleToSaveModal: {
			not_able: 'Not able to save',
			need_funds_in: 'First you need to have funds in ',
			add_funds: 'Add funds',
			exchange: 'Exchange'
		}
	},
	DepositWithdrawalSuccessScreen: {
		congrats: 'Congrats!',
		you_deposited: "You've made your deposit!",
		you_withdrawn: "You've withdrawn successfully!"
	},
	ExchangeResumeScreen: {
		exchange_resume: 'Confirmation',
		rate_fixed_for: 'Rate fixed for:',
		rate: 'Rate',
		swapping_via: 'Swapping via'
	},
	ExchangeScreen: {
		fetching: 'Fetching...',
		exchange: 'Exchange',
		review: 'Review',
		GasSelector: {
			GasOption: {
				transaction_fee: 'Transaction Fee',
				fast: 'Fast',
				normal: 'Normal',
				slow: 'Slow'
			}
		},
		validations: {
			INSUFFICIENT_ASSET_LIQUIDITY: 'Insufficient asset liquidity'
		}
	},
	ManualBackupScreen: {
		CopyButton: {
			copy_to_clipboard: 'Copy to clipboard'
		},
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
		interest: '% annualized interest',
		EmptyState: {
			save: 'Save',
			open_savings_account: 'Open %{protocol}\nSavings Account',
			lets_make_first_deposit: "Let's make your first deposit?"
		},
		Header: {
			save: 'Save'
		},
		CurrentValue: {
			current_deposits: 'Current deposits',
			withdraw: 'Withdraw',
			deposit: 'Deposit'
		},
		Body: {
			deposit: '{{source}} Deposit'
		},
		InfoModal: {
			Aave: 'Aave savings account'
		},
		MStable: {
			MStable: 'mStable savings account'
		}
	},
	SavingAccountsScreen: {
		title: 'Savings account'
	},
	SettingsScreen: {
		title: 'Settings',
		creating_wallet: 'Creating Wallet',
		backup: 'Backup',
		country: 'Country',
		language: 'Language',
		network: 'Network',
		new_wallet: 'New Wallet',
		usd_coin: 'US Dollar Coin',
		contact_support: 'Contact Support',
		help_centre: 'Help Center',
		switch_account: 'Switch Account',
		my_wallet: 'My Wallet',
		my_account: 'My Account',
		help: 'Help',
		other: 'Other',
		savings_account: 'Savings Account',
		enter_referral_code: 'Enter referral code'
	},
	TopUpWaitScreen: {
		Failed: {
			something_gone_wrong: 'Oh no! Something has gone wrong. Please try again later or contact the support.',
			reference: 'Reference: '
		},
		Processing: {
			almost_there: 'Almost there... this might take a minute...',
			please_wait: {
				payment: 'Please wait while we process your payment...',
				transfer: 'Please wait while we process your transfer...'
			}
		},
		Success: {
			funds_being_deposited: 'Your funds are being deposited into your wallet...',
			done: 'Done'
		}
	},
	TransactionsScreen: {
		Header: {
			transactions: 'Transactions'
		},
		Selector: {
			all: 'All',
			sent: 'Sent',
			received: 'Received'
		}
	},
	USDCoinScreen: {
		usd_asset: 'USD Asset'
	},
	WalletAssetsScreen: {
		header: 'Wallet',
		ValueBox: {
			current_value: 'Current value'
		},
		AssetList: {
			Header: {
				asset_header: 'Asset'
			},
			Selector: {
				all_coins: 'All coins',
				stable_coins: 'Stable coins'
			},
			Card: {
				your_wallet_balance: 'Your wallet balance'
			}
		},
		AssetListEmpty: {
			no_tokens_yet: 'No tokens yet',
			lets_buy_some: "Let's buy some?",
			add_funds_to_start: 'Add funds to start'
		}
	},
	WalletCreatedScreen: {
		wallet_created: 'Wallet Created!',
		need_backup:
			'You need to create a backup of your wallet. Keep your backup safe as losing it could mean a loss of funds.',
		modal_error: 'Backup error'
	},
	WalletScreen: {
		AppTour: {
			Boxes: {
				Steps: {
					Step0: {
						welcome: 'Welcome to Minke!',
						your_new_favorite:
							'Your new favourite way to save on stablecoins and earn up to 5% annualized interest.'
					},
					Step1: {
						add_funds: 'Add funds',
						you_can_buy: 'You can buy USDC in 3 clicks with Apple Pay or your local payment solution.'
					},
					Step2: {
						save: 'Save',
						get_up_to: 'Get up to 5% annual interest on stablecoins with mStable or Aave.'
					},
					Step3: {
						send: 'Send',
						send_tokens_to: 'Send tokens to another wallet or to an exchange like Binance or Coinbase.'
					},
					Step4: {
						exchange: 'Exchange',
						swap: 'Swap between tokens.'
					},
					Step5: {
						receive: 'Receive',
						copy_your:
							'Receive funds from a friend or send funds into your wallet from an exchange like Coinbase.',
						finish: 'Finish'
					}
				},
				Arrow: {
					back: 'Back',
					next: 'Next'
				}
			}
		},
		Content: {
			transactions: 'Transactions',
			accounts: 'Accounts'
		},
		Header: {
			welcome: 'Welcome',
			points: 'points'
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
			delete_wallet: 'Delete wallet',
			are_you_sure: 'Are you sure?',
			cancel: 'Cancel'
		},
		ModalsImport: {
			address_copied: 'Address copied!'
		},
		TransactionsTable: {
			see_all: 'See all'
		},
		components: {
			Stories: {
				whats_new: 'What’s new?'
			}
		},
		screens: {
			Accounts: {
				wallet: 'Wallet',
				available_funds_in_your_wallet: 'Available funds in your wallet',
				savings: 'Savings',
				funds_deposited_in_savings: 'Funds deposited in savings',
				borrowing: 'Borrowing',
				open_loans: 'Open loans',
				coming_soon: 'Coming soon',
				points: 'Points',
				points_earned: 'Refer a friend, earn crypto!'
			},
			Transactions: {
				NoTransactionsYet: {
					no_transactions_here: 'No transactions here',
					lets_get_started: "Let's get started?"
				}
			}
		},
		Modals: {
			AvatarModal: {
				Chosen: {
					edit: 'Edit your avatar image',
					select: 'Select a Minke avatar',
					choose: 'Choose from library'
				},
				Select: {
					select: 'Select your avatar'
				}
			},
			ReceiveModal: {
				receive: 'Receive',
				show_qr: 'Show your QR code or share your informations'
			},
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
				},
				add: '+ Add'
			}
		}
	},
	WelcomeScreen: {
		wave_goodbye: 'Wave goodbye to your bank!',
		easily: 'Easily save, spend and invest with',
		creating: 'Creating wallet',
		create: 'Create Wallet',
		import_or_restore: 'Import or Restore Wallet',
		i_have_a_referral_code: 'I have a referral code',
		ImportWalletModal: {
			add_wallet: 'Add Wallet',
			seed_or_key: 'Seed phrase or private key',
			importing: 'Importing wallet',
			import: 'Import Wallet',
			SelectImportMethodModal: {
				import_wallet: 'Import wallet',
				restore_from_icloud: 'Restore from {{cloudPlatform}}',
				backup_wallets_count: 'You have %{count} wallet%{plural} backed up',
				import_with_secret_phrase: 'Import with secret phrase or private key'
			}
		}
	},
	WithdrawScreen: {
		withdraw: 'Withdraw',
		balance: 'Balance: '
	},
	ReferralScreen: {
		Header: {
			points: 'Points'
		},
		CurrentValue: {
			pts: 'pts.',
			owned: 'Owned',
			redeem: 'Redeem',
			earn: 'Earn'
		},
		RedeemScreen: {
			redeem_minke_points: 'Redeem Minke Points',
			swap: 'Swap',
			Modals: {
				WrongNetwork: {
					wrong_network: 'Oops! It seems like you are in the wrong network',
					please_change_network: 'Please change to Polygon to redeem your points.',
					change_to_polygon: 'Change to Polygon'
				},
				NotEnoughPoints: {
					you_dont_have_points: "Oops! You don't have any points",
					you_can_earn: 'You can earn Minke points by:',
					referring_a_friend: 'Referring a friend',
					topping_up: 'Topping-up',
					get_rewarded: 'Get rewarded for saving money!',
					what_can_you_do_with_your_points: 'What can you do with your points?',
					you_can_redeem: 'You can redeem your points for MATIC tokens.'
				}
			}
		},
		Modals: {
			HelpModal: {
				how_minke_points_work: 'How Minke points work?',
				rewards_explanation: 'Minke points are rewards given to you when you perform certain tasks on the app.',
				you_can_earn_points_by: 'You can earn points by:',
				topping_up_for_the_first_time: 'Topping up for the first time.',
				refering_minke: 'Referring Minke to friends and family.',
				setting_recurrent_top_ups: 'Setting recurrent top-ups.',
				what_can_you_do: 'What can you do with your points?',
				you_can_redeem_your_points: 'You can redeem your points for MATIC tokens. '
			},
			EarnModal: {
				earn_minke_points: 'Earn Minke points!',
				refer_a_friend: 'Refer a friend',
				when_your_friends_top_up: 'When your friend tops up 100 USDC both get 100 Minke points.',
				top_up: 'Top-up',
				get_rewarded: 'Get rewarded for saving money!',
				coming_soon: '(Coming soon)',
				share_text:
					"Hi! I've been using Minke to save and earn 20x more than my bank. We will both receive 100 Minke Reward Points (~$10 that you can buy crypto with) when you signup and make your first deposit of $100 or more. My invite code is {{code}} - signup here: https://apps.apple.com/app/minke-defi-wallet/id1585144414"
			}
		},
		Body: {
			referral: 'Referral',
			deposit: 'Deposit',
			points: '{{count}} points'
		}
	},
	RedeemConfirmScreen: {
		confirmation: 'Confirmation',
		rate_fixed_for: 'Rate fixed for:',
		errors: {
			failed_claim: 'Your redeem was not completed. Please, contact our support.',
			invalid_request: 'Invalid request'
		}
	},
	EnterReferralCodeScreen: {
		enter_referral_code: 'Enter referral code',
		get_rewarded_for_saving_money: 'Get rewarded for saving money!',
		or: 'or',
		refer_a_friend: 'Refer a friend',
		referral_note:
			'This code can only be used once. After topping-up 100 USDC you and your friend will get each 100 Minke points.',
		invalid_code: 'Invalid code',
		your_code_is_invalid: 'Your code does not exist or is already in use in one of your wallets'
	},
	ImportWalletScreen: {
		import_wallet: 'Import Wallet',
		import_with_secret_phrase: 'Import with secret phrase or private key',
		connect_wallet: 'Connect Wallet',
		restore_from_icloud: 'Restore from {{cloudPlatform}}',
		backup_wallets_count: 'You have %{count} wallet%{plural} backed up'
	},
	Hooks: {
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
	},
	Containers: {
		AddFunds: {
			LocalCurrencyModal: {
				choose_amount_in: 'Choose the amount in {{currency}}'
			},
			ChooseQuantityModal: {
				buy_some: 'Buy some {{symbol}}',
				with: ' with',
				to_start_using: ' to start using Minke:',
				choose_another_amount: 'Choose another amount',
				or_deposit: 'or deposit',
				send_from: 'Send from ',
				or_another_exchange: ' or another exchange',
				copy_address: 'Copy address',
				address_copied: 'Address copied!'
			},
			CoinSelectorModal: {
				add_funds: 'Add funds',
				choose_asset: "Choose which asset you'd like to buy"
			},
			CustomAmountModal: {
				choose_another_amount: 'Choose another amount between {{min}} and {{max}}',
				use_a_debit_card: 'Use a debit card'
			}
		}
	},
	Components: {
		AaveReusables: {
			Info: {
				what_is: 'What is Aave?',
				aave_des:
					'Aave lets you earn interest on your crypto and stablecoins by lending it to borrowers. Aave is a decentralized protocol for lending and borrowing crypto. Rates are variable and can change at any time.\n\nRisks include the economics of the protocol, market risks, security of the smart contracts, counterparty risk and more. Aave has been audited by Trail of Bits and Open Zeppelin.',
				view_site: 'View Site',
				learn_more: 'Learn More'
			}
		},
		MStableReusables: {
			Info: {
				what_is: 'What is mStable?',
				mstable_des:
					'mStable is an autonomous and non-custodial infrastructure for pegged-value crypto assets. The protocol was created to address three major problems:\n\nSignificant fragmentation in same-peg crypto assets (there are currently at least 5 major USD pegged crypto assets on Ethereum, for example.\n\nLack of yield in fiat currencies and pegged crypto assets.\n\nLack of protection against permanent capital loss in pegged crypto assets',
				view_site: 'View Site',
				learn_more: 'Learn More'
			}
		},
		PendingTransactions: {
			pending: 'Pending',
			success: 'Success',
			failed: 'Failed'
		},
		Transaction: {
			failed: 'Failed',
			view_on: 'View on',
			cancel: 'Cancel',
			adding_via_apple_pay: 'Adding via Apple Pay',
			withdrew_from_savings: 'Withdrew',
			deposited_in_savings: 'Deposited',
			swap: 'Swapped',
			from: 'From',
			to: 'To',
			today: 'Today',
			yesterday: 'Yesterday',
			this_month: 'This Month'
		},
		LoadingScreen: {
			this_can_take_a_few_seconds: 'This can take a few seconds'
		},
		TokenAmountInput: {
			send_max: 'Send max'
		},
		NetworkWarning: {
			NetworkTag: {
				sending_on: 'Sending on the {{network}} network'
			}
		},
		EmptyStates: {
			NoTokens: {
				no_tokens_here: 'No tokens here'
			},
			NoReferralPoints: {
				your_points_will_appear_here: 'Your points will appear here',
				lets_get_started: "Let's get started?",
				earn_points: 'Earn points'
			}
		},
		Inputs: {
			enter_password: 'Enter password',
			repeat_password: 'Repeat password',
			search: 'Search',
			search_token: 'Search token',
			name: 'Name',
			ens_or_wallet: 'ENS or Wallet Address',
			enter_code: 'Enter code'
		},
		Buttons: {
			backup_to_icloud: 'Back up to {{cloudPlatform}}',
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
			add_funds_to_start: 'Add funds to start',
			share: 'Share',
			pay_with: 'Pay with ',
			use_code: 'Use code',
			loading: 'Loading',
			swap: 'Swap'
		},
		ModalReusables: {
			TransactionWaitModal: {
				transaction_done: 'Transaction done',
				processing_transaction: 'Processing Transaction',
				sent: 'Sent',
				deposited: 'Deposited',
				withdrew: 'Withdrew',
				exchanged: 'Exchanged',
				sending: 'Sending',
				depositing: 'Depositing',
				withdrawing: 'Withdrawing',
				exchanging: 'Exchanging',
				in: 'in',
				for: 'for',
				transaction: 'Transaction'
			},
			Error: {
				title: 'Oops!',
				description: 'Something went wrong, our developers have been notified.',
				buttonLabel: 'Ok, got it',
				Blockchain: {
					description: 'Something went wrong when talking with the blockchain'
				}
			},
			ComingSoonModal: {
				coming_soon: 'Coming soon!',
				devs_doing_something: 'Devs are doing something.'
			}
		},
		SettingsHeader: {
			done: 'Done'
		},
		TokenCard: {
			choose_token: 'Choose token',
			available: 'Available'
		},
		InterestBanner: {
			interest: '% annualized interest'
		}
	},
	Logs: {
		couldnt_restore_backup: 'We could not restore your backups',
		not_enough_balance_for_gas: 'Not enough balance for gas'
	}
};
