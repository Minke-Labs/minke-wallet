export default {
	AccountsScreen: {
		import_or_restore: 'Importar ou Restaurar',
		accounts: 'Contas'
	},
	AssetsScreen: {
		AboutCoin: {
			about: 'Sobre'
		},
		Balance: {
			Balance: 'Saldo',
			Buttons: {
				buy: 'Comprar',
				sell: 'Vender',
				send: 'Enviar'
			}
		},
		MarketCap: {
			market_cap: 'Valor de mercado',
			volume: 'Volume (1D)'
		},
		Changes: {
			changes: 'Mudanças',
			hour: '1 Hora',
			day: '1 Dia',
			week: '1 Semana',
			month: '1 Mês',
			year: '1 Ano',
			all: 'Total'
		},
		Chart: {
			'1H': '1H',
			'1D': '1H',
			'1W': '1S',
			'1M': '1M',
			'1Y': '1A',
			All: 'Total'
		}
	},
	BackupSettingsScreen: {
		title: 'Backup'
	},
	BackupStatusScreen: {
		your_wallet_is_backed_up: 'Sua carteira tem backup!',
		if_you_lose: 'Se você perder esse dispositivo poderá recuperar sua carteira através do backup no iCloud.',
		your_wallet_is_not_backed_up: 'Sua carteira não tem backup!',
		your_keys_your_coins: 'Faça backup para não correr o risco de perder sua carteira.',
		back_up_to_icloud: 'Backup no iCloud',
		backup: 'Backup',
		done: 'Pronto',
		go_to_wallet: 'Ir para a carteira',
		view_secret_phrase: 'Ver Frase Secreta',
		backup_error: 'Erro no backup'
	},
	BackupToICloudScreen: {
		CreateBackupPassword: {
			choose_password: 'Escolha uma senha',
			memorable_password: 'Escolha uma senha que você se lembrará.',
			not_recoverable: 'Ela não poderá ser recuperada!'
		},
		ConfirmBackupPassword: {
			enter_backup_password: 'Entre a senha do backup',
			to: 'Para',
			restore_from: 'restaurar suas carteiras do',
			add_to: 'adicionar esta carteira ao seu',
			enter_existing: 'backup do iCloud, digite sua senha de backup existente'
		}
	},
	ChangeCurrencyScreen: {
		header_title: 'Alterar a Moeda'
	},
	ChangeNetworkScreen: {
		ListItem: {
			test_network: 'test network'
		}
	},
	WalletAssetsScreen: {
		header: 'Carteira',
		asset_header: 'Ativo',
		ValueBox: {
			current_value: 'Valor atual'
		},
		Selector: {
			all_coins: 'Todas as moedas',
			stable_coins: 'Moedas estáveis'
		},
		Card: {
			your_wallet_balance: 'Seu saldo'
		}
	},
	SettingsScreen: {
		title: 'Configurações',
		creating_wallet: 'Criando carteira',
		backup: 'Backup',
		currency: 'Moeda',
		network: 'Rede',
		new_wallet: 'Nova carteira',
		usd_coin: 'Moeda USD',
		contact_support: 'Contactar suporte',
		switch_account: 'Trocar conta'
	},
	LoadingScreen: {
		this_can_take_a_few_seconds: 'Isso pode levar alguns segundos'
	},
	WalletScreen: {
		Content: {
			transactions: 'Transações',
			accounts: 'Contas'
		},
		Header: {
			welcome: 'Olá'
		},
		AssetsPanel: {
			your_total_assets: 'Seus ativos',
			add_funds: 'Adicionar Fundos',
			save: 'Investir'
		},
		ActionPanel: {
			send: 'Enviar',
			exchange: 'Câmbio',
			receive: 'Receber',
			copy_address: 'Copiar endereço',
			delete_wallet: 'Apagar carteira',
			are_you_sure: 'Você tem certeza?',
			cancel: 'Cancelar'
		},
		ModalsImport: {
			address_copied: 'Endereço copiado!'
		},
		TransactionsTable: {
			today: 'Hoje',
			yesterday: 'Ontem',
			this_month: 'Nesse mês',
			see_all: 'Ver todas'
		}
	},
	Transaction: {
		failed: 'Falhou',
		view_on: 'Ver em',
		cancel: 'Cancelar',
		adding_via_apple_pay: 'Adicionando via Apple Pay',
		swap: 'Câmbio %{source} para %{dest}',
		from: 'De',
		to: 'Para'
	},
	Accounts: {
		wallet: 'Carteira',
		available_funds_in_your_wallet: 'Fundos na sua carteira',
		savings: 'Investimentos',
		funds_deposited_in_savings: 'Fundos investidos',
		borrowing: 'Empréstimos',
		open_loans: 'Empréstimos em aberto',
		coming_soon: 'Em breve'
	},
	TransactionsScreen: {
		transactions: 'Transações',
		all: 'Todas',
		sent: 'Enviadas',
		received: 'Recebidas'
	},
	iCloudBackup: {
		BACKING_UP_WALLET: 'Fazendo backup...',
		CREATING_WALLET: 'Criando carteira...',
		FETCHING_PASSWORD: 'Recuperando senha...',
		IMPORTING_WALLET: 'Importando...',
		RESTORING_WALLET: 'Restaurando...',
		errors: {
			KEYCHAIN_ACCESS_ERROR: 'Você precisa autenticar para continuar o processo de backup',
			ERROR_DECRYPTING_DATA: 'Senha incorreta! Por favor, tente novamente.',
			NO_BACKUPS_FOUND: 'Não conseguimos encontrar um backup anterior.',
			ERROR_GETTING_ENCRYPTED_DATA:
				'Não conseguimos acessar o seu backup neste momento. Por favor, tente novamente mais tarde',
			GENERIC_ERROR: 'Ocorreu um erro durante o backup. Código de erro: %{code}'
		}
	},
	ManualBackupScreen: {
		done: 'Pronto',
		recovery_phrase: 'Frase de recuperação',
		write_this_down: 'Escreva num papel ou salve no seu gerenciador de senhas.',
		address_copied: 'Endereço copiado!',
		Warning: {
			minke_will_never_ask: 'A Minke nunca solicita essas palavras',
			anyone_who_has_these: 'Com elas qualquer um pode acessar sua carteira!'
		}
	},
	CopyButton: {
		copy_to_clipboard: 'Copiar para área de transferência'
	},

	Components: {
		Inputs: {
			enter_password: 'Entre a senha',
			repeat_password: 'Repita a senha',
			search: 'Procurar'
		},
		Buttons: {
			backup_to_icloud: 'Faça o Backup no iCloud',
			confirm_restore: 'Confirmar restauração',
			confirm_backup: 'Confirmar backup'
		},
		ModalReusables: {
			Error: {
				description: 'Algo deu errado, nossos desenvolvedores foram notificados.',
				buttonLabel: 'Ok, entendi'
			}
		},
		SettingsHeader: {
			done: 'Feito'
		}
	},

	Logs: {
		couldnt_restore_backup: 'Não foi possível restaurar seus backups'
	}
};
