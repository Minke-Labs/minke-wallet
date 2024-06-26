/* eslint-disable max-len */
export default {
	// SCREENS
	AccountsScreen: {
		import_or_restore: 'Import or Restore',
		accounts: 'Accounts'
	},
	AddFundsScreen: {
		header: 'Add Funds',
		you_pay: 'You pay',
		you_receive: 'You receive',
		Errors: {
			validation_snapx_min: 'Does not meet minimum transaction size',
			exchange_sourceAmountTooSmall: 'The amount is too small',
			minimal_topup_amount: 'The minimum amount is {{amount}} {{currency}}'
		}
	},
	AssetsScreen: {
		AboutCoin: {
			about: 'About '
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
		view_secret_phrase: 'View Secret Phrase',
		backup_error: 'Backup error',
		go_to_wallet: 'Go to Wallet'
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
		header_title: 'Default Network',
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
			balance: 'Balance: ',
			on: 'on'
		},
		NotAbleToSaveModal: {
			not_able: 'Not able to save',
			need_funds_in: 'First you need to have funds in ',
			add_funds: 'Deposit Funds',
			exchange: 'Exchange'
		}
	},
	DepositWithdrawalSuccessScreen: {
		congrats: 'Congrats!',
		you_deposited: "You've made your deposit!",
		you_withdrawn: "You've withdrawn successfully!"
	},
	EnterReferralCodeScreen: {
		enter_referral_code: 'Enter referral code',
		get_rewarded_for_saving_money: 'Get rewarded with better money!',
		or: 'or',
		buy_token: 'Buy {{token}}',
		referral_note:
			'This code can only be used once. After buying stablecoins you and your friend will each get up to 50 Minke points.',
		invalid_code: 'Invalid code',
		your_code_is_invalid: 'Your code does not exist or is already in use in one of your wallets'
	},
	ExchangeResumeScreen: {
		exchange_resume: 'Confirmation',
		rate_fixed_for: 'Rate fixed for:',
		rate: 'Rate',
		swapping_via: 'Swapping via',
		network: 'Network'
	},
	ExchangeScreen: {
		fetching: 'Fetching...',
		exchange: 'Exchange',
		review: 'Review',
		flip: 'Flip',
		settings: 'Settings',
		GasSelector: {
			GasOption: {
				transaction_fee: 'Transaction Fee',
				fast: 'Fast',
				normal: 'Normal',
				slow: 'Slow',
				fee_paid_in: 'Fee Paid in '
			}
		},
		validations: {
			INSUFFICIENT_ASSET_LIQUIDITY: 'Insufficient asset liquidity'
		},
		SettingsModal: {
			max_slippage: 'Max Slippage',
			done: 'Done'
		}
	},
	HomeScreen: {
		Accounts: {
			AccountsOverview: {
				overview: 'Accounts overview',
				see_all: 'See all',
				investments_highlight: 'Investments highlights',
				stablecoins: 'Stablecoins'
			},
			AccountsEmpty: {
				buy_token_now: 'Buy {{token}} now!\nNo personal ID required.',
				purchase: 'Purchase in a few clicks with:'
			}
		},
		Assets: {
			your_total_assets: 'Your total assets',
			add_funds: 'Deposit Funds',
			Modals: {
				connect_wallet: 'Connect Wallet',
				disconnect_wallet: 'Disconnect Wallet',
				import_with_secret_phrase: 'Import with secret phrase or private key',
				restore_from_cloud: 'Restore from {{cloudPlatform}}',
				backup_wallets_count: 'You have %{count} wallet%{plural} backed up',
				no_backups_found: 'No backups found',
				AvatarModal: {
					Main: {
						edit: 'Edit your avatar image',
						select: 'Select a Minke avatar',
						choose: 'Choose from library'
					},
					Select: {
						select: 'Select your avatar'
					}
				}
			}
		},
		Header: {
			welcome: 'Welcome',
			points: 'points',
			invite_a_friend: 'Invite your friend!'
		},
		Stories: {
			learn_about_minke: 'Learn about Minke'
		},
		MintNFT: {
			mint_a_minke_whale_nft: 'Mint a Minke Whale NFT!',
			complete_two_tasks: 'Complete two tasks in order to mint a free NFT',
			mint_nft: 'Mint NFT'
		}
	},
	ImportWalletScreen: {
		import_wallet: 'Import Wallet',
		import_with_secret_phrase: 'Import with secret phrase or private key',
		connect_wallet: 'Connect Wallet',
		restore_from_icloud: 'Restore from {{cloudPlatform}}',
		backup_wallets_count: 'You have %{count} wallet%{plural} backed up',
		disconnect_wallet: 'Disconnect Wallet',
		please_change_network: 'Please change to {{network}} to connect this wallet.',
		Error: {
			no_network: "We don't support this network. Please, select another network in the wallet app."
		}
	},
	InvestmentsScreen: {
		investments: 'Investments',
		current_value: 'Current value'
	},
	InvestmentsDetailScreen: {
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
	ManualBackupScreen: {
		CopyButton: {
			copy_to_clipboard: 'Copy to clipboard'
		},
		done: 'Done',
		recovery_phrase: 'Recovery phrase',
		write_this_down: 'Write this down on paper or save it in your password manager.',
		Warning: {
			minke_will_never_ask: 'Minke will never ask for these words',
			anyone_who_has_these: 'Anyone who has these can access your wallet!'
		},
		go_to_wallet: 'Go to Wallet'
	},
	MinkeHubScreen: {
		minke_hub: 'Minke Hub',
		accounts: 'Accounts',
		coins_pegged_to: 'Coins pegged to the US dollar',
		investments: 'Investments',
		fluctuating_value: 'Coins with fluctuating value',
		savings: 'Savings',
		earn_passive_income: 'Earn passive income from your stablecoins',
		nfts_and_collectibles: 'Non-fungible tokens and collectibles',
		others: 'Others',
		send_to_bank: 'Send to bank',
		convert_to_local: 'Convert to your local currency',
		referral: 'Referral',
		refer_and_earn: 'Refer a friend and earn free crypto',
		stablecoins: 'Stablecoins'
	},
	MintNFTScreen: {
		title: 'Claim NFT',
		claim_a_minke_whale_nft: 'Claim a Minke Whale NFT!',
		complete_two_tasks:
			'Complete 2 tasks to claim your free Minke Whale NFT as a reward for being Minke Wallet user.',
		join_telegram:
			'Join the Minke Community on Telegram to learn about crypto and be up to date on the latest news.',
		join_telegram_group: 'Join Telegram Group',
		follow_our_new_onramp:
			'Follow our new onramp partner on Twitter to learn more about buying crypto P2P directly from your wallet.',
		follow_on_twitter: 'Follow OpenPeer on Twitter',
		you_can_mint:
			"Congratulations! You can now mint the NFT with zero gas fees and you'll see it in your wallet and on OpenSea.",
		mint_nft: 'Mint NFT!',
		nft_claimed: 'NFT Claimed',
		your_minke_whale_nft: 'Your Minke Whale NFT',
		view_on_opensea: 'View on OpenSea',
		already_minted: 'already minted',
		VerifyTelegramModal: {
			verify_telegram: 'Verify Telegram',
			verify_telegram_membership: 'Verify Telegram Membership',
			verification_failed: 'This user did not join on Telegram'
		},
		VerifyTwitterModal: {
			verify_twitter: 'Verify Twitter',
			verify_twitter_follower: 'Verify Twitter Follower',
			verification_failed: 'This user did not follow on Twitter'
		}
	},
	NetworkModal: {
		if_you_receiving: 'If you are receiving from an exchange or wallet make sure they support withdrawals on the ',
		network: '{{network}} network'
	},
	NFTDetailScreen: {
		by: 'by ',
		Panel: {
			floor_price: 'Floor price',
			last_sale_price: 'Last sale price'
		},
		view_on_openSea: 'View on OpenSea',
		about: 'About'
	},
	NFTScreen: {
		assets: 'Assets',
		estimated_value: 'Estimated value',
		InfoModal: {
			how_are_valued: 'How are my NFTs valued?',
			desc: 'Your NFTs are valued based on a combination of the collection floor price, last sale price and the individual unique attributes.'
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
					please_change_network: 'Please change to {{network}} to redeem your points.',
					change_to_network: 'Change to {{network}}'
				},
				NotEnoughPoints: {
					you_dont_have_points: "Oops! You don't have any points",
					you_can_earn: 'You can earn Minke points by:',
					referring_a_friend: 'Referring a friend',
					topping_up: 'Topping-up',
					get_rewarded: 'Get rewarded with better money!',
					what_can_you_do_with_your_points: 'What can you do with your points?',
					you_can_redeem: 'You can redeem your points for rewards in USDC on Polygon.'
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
				what_can_you_do: 'What can you do with your points?',
				you_can_redeem_your_points: 'You can redeem your points for rewards in USDC on Polygon. '
			},
			EarnModal: {
				earn_minke_points: 'Earn Minke points!',
				refer_a_friend: 'Refer a friend',
				when_your_friends_top_up:
					'When your friend purchases stablecoins they will get up to 50 Minke points. You will earn a 20% points commission per referral.',
				share_text:
					"Hi! I've been using Minke to beat inflation with US dollar stablecoins. We will both receive up to $5 USDC when you signup and make your first purchase or exchange. My invite code is {{code}} - signup here: https://minke.onelink.me/rwwq/ref",
				points_are_distributed: 'Points are distributed every 24 hours by 12:00 UTC on weekdays.'
			}
		},
		Body: {
			referral: 'Referral',
			deposit: 'Deposit',
			exchange: 'Exchange',
			points: '{{count}} points'
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
	SearchDepositProtocols: {
		title: 'Savings account'
	},
	SecurityScreen: {
		title: 'Security',
		require_biometric: 'Require Biometric or Pin Identification to Transact',
		are_you_sure: 'Are you sure?',
		cancel: 'Cancel'
	},
	SettingsScreen: {
		DeleteModal: {
			delete_wallet: 'Delete wallet',
			keep_wallet: 'Keep wallet',
			are_you_sure: 'Are you sure you want to delete this wallet?',
			recover:
				'You can only recover it with you private key or your {{os}} recovery password (if stored on {{os}})',
			cancel: 'Cancel'
		},
		title: 'Settings',
		creating_wallet: 'Creating Wallet',
		backup: 'Backup',
		country: 'Country',
		language: 'Language',
		network: 'Default Network',
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
		enter_referral_code: 'Enter referral code',
		delete_wallet: 'Delete wallet',
		security: 'Security'
	},
	StablecoinsScreen: {
		current_value: 'Current value',
		get_annualized_interest: 'Get {{apy}}% annualized interest',
		stablecoins: 'Stablecoins'
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
	TransactionsDetailScreen: {
		transaction_type: 'Transaction type:',
		date: 'Date:',
		sent_to: 'Sent to:',
		exchanged: 'Exchanged:',
		exchange_details: '{{fromAmount}} {{from}} for {{toAmount}} {{to}}',
		hash: 'Hash',
		exchange_rate: 'Exchange rate',
		savings_account: 'Savings Account:',
		received_from: 'Received from:'
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
	WalletCreatedScreen: {
		wallet_created: 'Wallet Created!',
		need_backup:
			'You need to create a backup of your wallet. Keep your backup safe as losing it could mean a loss of funds.',
		modal_error: 'Backup error'
	},
	WelcomeScreen: {
		referral_code_applied: 'Referral code applied',
		wave_goodbye: 'Minke is being\n aquired by Zengo',
		easily: "We'll be shutting down Minke over the next couple months. Please send your assets to Zengo. Guides are available on our website www.minke.app \n\nMinke will no longer be available on July 1st 2024.",
		creating: 'Creating wallet',
		create: 'Create Wallet',
		import_or_restore: 'Import Existing Wallet',
		i_have_a_referral_code: 'I have a referral code',
		view_backups: 'View Backups',
		go_to_wallet: 'Go to Wallet',
		download_zengo: 'Download Zengo',
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

	// CONTEXTS
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
		AT: {
			name: 'Austria',
			currencyName: 'Euro'
		},
		BE: {
			name: 'Belgium',
			currencyName: 'Euro'
		},
		BG: {
			name: 'Bulgaria',
			currencyName: 'Bulgarian Lev'
		},
		HR: {
			name: 'Croatia',
			currencyName: 'Croatian Kuna'
		},
		CY: {
			name: 'Cyprus',
			currencyName: 'Euro'
		},
		CZ: {
			name: 'Czech Republic',
			currencyName: 'Czech Koruna'
		},
		DK: {
			name: 'Denmark',
			currencyName: 'Danish Krone'
		},
		EE: {
			name: 'Estonia',
			currencyName: 'Euro'
		},
		FI: {
			name: 'Finland',
			currencyName: 'Euro'
		},
		FR: {
			name: 'France',
			currencyName: 'Euro'
		},
		DE: {
			name: 'Germany',
			currencyName: 'Euro'
		},
		GR: {
			name: 'Greece',
			currencyName: 'Euro'
		},
		HU: {
			name: 'Hungary',
			currencyName: 'Hungarian Forint'
		},
		IE: {
			name: 'Ireland',
			currencyName: 'Euro'
		},
		IT: {
			name: 'Italy',
			currencyName: 'Euro'
		},
		LV: {
			name: 'Latvia',
			currencyName: 'Euro'
		},
		LT: {
			name: 'Lithuania',
			currencyName: 'Euro'
		},
		LU: {
			name: 'Luxembourg',
			currencyName: 'Euro'
		},
		MT: {
			name: 'Malta',
			currencyName: 'Euro'
		},
		NL: {
			name: 'Netherlands',
			currencyName: 'Euro'
		},
		PL: {
			name: 'Poland',
			currencyName: 'Polish Złoty'
		},
		PT: {
			name: 'Portugal',
			currencyName: 'Euro'
		},
		RO: {
			name: 'Romania',
			currencyName: 'Romanian Leu'
		},
		SK: {
			name: 'Slovakia',
			currencyName: 'Euro'
		},
		SI: {
			name: 'Slovenia',
			currencyName: 'Euro'
		},
		ES: {
			name: 'Spain',
			currencyName: 'Euro'
		},
		SE: {
			name: 'Sweden',
			currencyName: 'Swedish Krona'
		},
		US: {
			name: 'United States',
			currencyName: 'United States Dollar'
		},
		EU: {
			name: 'European Union',
			currencyName: 'Euro'
		},
		GB: {
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
		TR: {
			name: 'Turkey',
			currencyName: 'Turkish Lira'
		},
		AR: {
			name: 'Argentina',
			currencyName: 'Argentine Peso'
		},
		LK: {
			name: 'Sri Lanka',
			currencyName: 'Sri Lankan Rupee'
		},
		NG: {
			name: 'Nigeria',
			currencyName: 'Nigerian Naira'
		},
		PK: {
			name: 'Pakistan',
			currencyName: 'Pakistani Rupee'
		},
		CH: {
			name: 'Switzerland',
			currencyName: 'Swiss Franc'
		},
		CO: {
			name: 'Colombia',
			currencyName: 'Colombia Peso'
		},
		DO: {
			name: 'Dominican Republic',
			currencyName: 'Dominican Peso'
		},
		EG: {
			name: 'Egypt',
			currencyName: 'Egyptian Pound'
		},
		HK: {
			name: 'Hong Kong',
			currencyName: 'Hong Kong Dollar'
		},
		ID: {
			name: 'Indonesia',
			currencyName: 'Indonesian Rupiah'
		},
		JP: {
			name: 'Japan',
			currencyName: 'Japanese Yen'
		},
		JO: {
			name: 'Jordan',
			currencyName: 'Jordanian Dollar'
		},
		KE: {
			name: 'Kenya',
			currencyName: 'Kenyan Shilling'
		},
		KR: {
			name: 'South Korea',
			currencyName: 'South Korean Won'
		},
		KW: {
			name: 'Kuwait',
			currencyName: 'Kuwaiti Dinar'
		},
		MA: {
			name: 'Morocco',
			currencyName: 'Moroccan Dirham'
		},
		MX: {
			name: 'Mexico',
			currencyName: 'Mexican Peso'
		},
		MY: {
			name: 'Malaysia',
			currencyName: 'Malaysian Ringgit'
		},
		NO: {
			name: 'Norway',
			currencyName: 'Norwegian Krone'
		},
		NZ: {
			name: 'New Zealand',
			currencyName: 'New Zealand Dollar'
		},
		OM: {
			name: 'Oman',
			currencyName: 'Omani Rial'
		},
		PE: {
			name: 'Peru',
			currencyName: 'Peruvian Sol'
		},
		SG: {
			name: 'Singapore',
			currencyName: 'Singapore Dollar'
		},
		TH: {
			name: 'Thailand',
			currencyName: 'Thai Baht'
		},
		TW: {
			name: 'Taiwan',
			currencyName: 'Taiwan Dollar'
		},
		VN: {
			name: 'Vietnam',
			currencyName: 'Vietnamese Dong'
		},
		ZA: {
			name: 'South Africa',
			currencyName: 'South African Rand'
		},
		IL: {
			name: 'Israel',
			currencyName: 'Israeli New Shekel'
		},
		CN: {
			name: 'China',
			currencyName: 'Chinese Yuan'
		},
		IN: {
			name: 'India',
			currencyName: 'Indian Rupee'
		}
	},

	// HOOKS
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

	// CONTAINERS
	Containers: {
		AddFunds: {
			Header: {
				country: 'Country'
			},
			LocalCurrencyModal: {
				choose_amount_in: 'Choose the amount in {{currency}}'
			},
			ExternalExchangeModal: {
				external: 'External exchange',
				send_from: 'Send from Binance, Coinbase, Kraken or another centralized exchange.',
				make_sure: '*Make sure the network selected is',
				or: 'or',
				copy: 'Copy wallet address'
			},
			ChooseQuantityModal: {
				select_country: 'Select your country of residence to access your local payments option',
				change_country: 'Change country',
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
			SelectorModal: {
				add_funds: 'Deposit Funds',
				buy_crypto: 'Buy crypto',
				apple_card_transfer: '{{pay}}, card or bank transfer',
				send_from_exchange: 'Send from Binance, Coinbase, others',
				external: 'External exchange'
			},
			CustomAmountModal: {
				choose_another_amount: 'Choose another amount between {{min}} and {{max}}',
				use_a_debit_card: 'Use a debit card'
			}
		}
	},

	// COMPONENTS
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
		AppTour: {
			Boxes: {
				Steps: {
					Step0: {
						welcome: 'Welcome to Minke!',
						your_new_favorite:
							'Your new favourite way to use stablecoins like USDC and USDT. Buy, send, save and invest with zero gas-fees.'
					},
					Step1: {
						add_funds: 'Deposit Funds',
						you_can_buy: 'You can transfer funds from your favorite exchange.'
					},
					Step2: {
						save: 'Save & Invest',
						earn_up_to:
							'Earn up to 5% annual interest on stablecoins or invest in other tokens without any gas fees.'
					},
					Step3: {
						send: 'Send',
						send_tokens_to: 'Send tokens to another wallet or to an exchange like Binance or Coinbase.',
						receive: 'Receive',
						receive_funds:
							'Receive funds from a friend or send funds into your wallet from an exchange like Coinbase.'
					},
					Step4: {
						earn_minke_points: 'Earn Minke points',
						refer_a_friend:
							'Refer a friend and earn up to $10 in USDC when they buy their first USDC or make an exchange.'
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
		Balance: {
			balance: 'Balance',
			Buttons: {
				buy: 'Buy',
				sell: 'Sell',
				send: 'Send'
			}
		},
		BlankStates: {
			NFT: 'NFTs',
			WalletAssets: 'Wallet',
			Exchange: 'Exchange',
			Save: 'Save',
			Deposit: 'Deposit',
			Withdraw: 'Withdraw',
			Send: 'Which asset do you want to send to {{to}}?',
			Referral: 'Referral'
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
			add_funds_to_start: 'Deposit funds to start',
			share: 'Share',
			pay_with: 'Pay with ',
			use_code: 'Use code',
			loading: 'Loading',
			swap: 'Swap',
			buy_token_now: 'Buy {{token}} now',
			verifying: 'Verifying...'
		},
		ByNetworks: {
			by_networks: 'By networks'
		},
		CountrySelector: {
			country: 'Country',
			to_offer: 'To offer you the best options to buy crypto please select your country of residence:'
		},
		DepositProtocolSelector: {
			choose_protocol: 'Choose savings account',
			change_account: 'Change account'
		},
		EmptyStates: {
			NoTokens: {
				no_tokens_here: 'No tokens here'
			},
			NoReferralPoints: {
				your_points_will_appear_here: 'Your points will appear here',
				lets_get_started: "Let's get started?",
				earn_points: 'Earn points'
			},
			NoTransactions: {
				your_transactions: 'Your transactions will appear here',
				lets_get_started: "Let's get started?",
				add_funds: 'Deposit funds to start'
			}
		},
		Expander: {
			show_less: 'Show less',
			show_more: 'Show more'
		},
		FloatingSelector: {
			Actions: {
				exchange: 'Exchange',
				swap: 'Swap one token for another',
				send: 'Send',
				receive: 'Receive',
				to_another: 'To another wallet or an exchange',
				from_another: 'From another wallet or exchange',
				transactions: 'Transactions',
				history_of_account_transactions: 'History of account transactions'
			},
			Modals: {
				ReceiveModal: {
					receive: 'Receive',
					show_qr: 'Show your QR code or share your informations'
				}
			}
		},
		GenericPayButton: {
			debit_credit: 'Debit/Credit card'
		},
		Header: {
			done: 'Done'
		},
		Inputs: {
			enter_password: 'Enter password',
			repeat_password: 'Repeat password',
			search: 'Search',
			search_token: 'Search token',
			search_currency: 'Search currency',
			name: 'Name',
			ens_or_wallet: 'ENS, Unstoppable Domain or Wallet Address',
			enter_code: 'Enter code',
			others: 'Others',
			slippage_tolerance: 'Slippage tolerance',
			enter_username: 'Enter username'
		},
		InterestBanner: {
			interest: '% annualized interest'
		},
		LoadingScreen: {
			this_can_take_a_few_seconds: 'This can take a few seconds'
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
				devs_doing_something: 'Devs are doing something.',
				got_it: 'Ok, got it'
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
						address_or_ens: 'Address, ENS or Unstoppable Domain',
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
		},
		MStableReusables: {
			Info: {
				what_is: 'What is mStable?',
				mstable_des:
					'mStable is a DeFi protocol that generates a variable yield across multiple stablecoins through lending and trading fees.\n\nWhen you deposit your stablecoins on mStable they are deposited in savings pools to generate interest. You also generate additional yield on your deposit when the mStable protocol is used to swap between stablecoins. For example, when swapping between USDC and USDT.\n\nmStable is auditzed by ConsenSys, Certik and Peckshield.',
				view_site: 'View Site',
				learn_more: 'Learn More'
			}
		},
		NetworkWarning: {
			NetworkTag: {
				sending_on: 'Sending on the {{network}} network',
				buying_on: 'Buying on the {{network}} network'
			}
		},
		PendingTransactions: {
			pending: 'Pending',
			success: 'Success',
			failed: 'Failed'
		},
		Snackbar: {
			address_copied: 'Address copied',
			select: 'Select a Country'
		},
		TokenAmountInput: {
			send_max: 'Send max'
		},
		TokenCard: {
			choose_token: 'Choose token',
			choose_currency: 'Choose currency',
			available: 'Available'
		},
		TokenItemCard: {
			buy: 'Buy'
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
			this_month: 'This Month',
			top_up: 'Top Up',
			savings_withdrew: 'Savings (withdrew)',
			savings_deposited: 'Savings (deposited)',
			exchanged: 'Exchanged',
			received: 'Received',
			sent: 'Sent'
		},
		WatchModeTag: {
			this_wallet_needs_to_be_reconnected: 'This wallet needs to be reconnected to {{network}}.',
			import_wallet: 'Import wallet to send transaction'
		}
	},

	// LOGS
	Logs: {
		couldnt_restore_backup: 'We could not restore your backups',
		not_enough_balance_for_gas: 'Not enough balance for gas'
	}
};
