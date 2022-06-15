/* eslint-disable max-len */
export default {
	LocationContext: {
		US: {
			name: 'Estados Unidos',
			currencyName: 'Dólar Americano'
		},
		EU: {
			name: 'União Europeia',
			currencyName: 'Euro'
		},
		UK: {
			name: 'Reino Unido',
			currencyName: 'Libra Esterlina'
		},
		AU: {
			name: 'Austrália',
			currencyName: 'Dólar Australiano'
		},
		CA: {
			name: 'Canadá',
			currencyName: 'Dólar Canadense'
		},
		BR: {
			name: 'Brasil',
			currencyName: 'Real Brasileiro'
		}
	},
	AccountsScreen: {
		import_or_restore: 'Importar ou Restaurar',
		accounts: 'Contas'
	},
	AssetsScreen: {
		AboutCoin: {
			about: 'Sobre '
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
		Upper: {
			Chart: {
				Changes: {
					changes: 'Mudanças',
					hour: '1 Hora',
					day: '1 Dia',
					week: '1 Semana',
					month: '1 Mês',
					year: '1 Ano',
					all: 'Total'
				},
				Selection: {
					Chart: {
						'1H': '1H',
						'1D': '1H',
						'1W': '1S',
						'1M': '1M',
						'1Y': '1A',
						All: 'Total'
					}
				}
			}
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
			enter_backup_password: 'Digite a senha do backup',
			to: 'Para',
			restore_from: 'restaurar suas carteiras do',
			add_to: 'adicionar esta carteira ao seu',
			enter_existing: 'backup do iCloud, digite sua senha de backup existente'
		}
	},
	ChangeCountryScreen: {
		header_title: 'Alterar o País'
	},
	ChangeLanguageScreen: {
		header_title: 'Alterar o Idioma'
	},
	ChangeNetworkScreen: {
		header_title: 'Rede',
		ListItem: {
			test_network: 'rede de testes'
		}
	},
	DepositScreen: {
		Congrats: {
			congrats: 'Parabéns',
			you_just: 'Você acabou de fazer seu primeiro depósito!',
			done: 'Pronto'
		},
		Deposit: {
			deposit: 'Depósito',
			balance: 'Saldo: '
		},
		OpenSavings: {
			open_account: 'Abrir uma Conta',
			aave: 'Abrir uma conta na Aave',
			mstable: 'Open mStable\nSavings Account',
			this_transaction: 'Esta transação vai custar alguns centavos.'
		},
		OpenMStable: {
			open_account: 'Abrir Conta',
			open_mstable: 'Abrir uma conta\nna mStable',
			what_is: 'O que é a mStable?',
			mstable_des:
				'mStable é serviço de infraestrutura para crypto ativos autônoma e não custodial. O protocolo foi criado para corrigir três problemas: \n\n- Fragmentação significativa entre ativos com o mesmo mecanismo de funcionamento (há pelo menos 5 grandes stablecoins vinculadas ao dólar americano na rede Ethereum, por exemplo). \n\n - Falta de rendimentos em stablecoins e moedas fiduciárias. \n\n - Falta de proteção contra perda de capital em crypto ativos vinculados a uma outra moeda.',
			view_site: 'Ver Site',
			learn_more: 'Ver Mais',
			this_transaction: 'Esta transação vai custar alguns centavos.'
		},
		NotAbleToSaveModal: {
			not_able: 'Não foi possível salvar',
			need_funds_in: 'Primeiro você precisa ter fundos em ',
			add_funds: 'Adicionar fundos',
			exchange: 'Converter'
		}
	},
	DepositWithdrawalSuccessScreen: {
		congrats: 'Parabéns!',
		you_deposited: 'Você fez o seu depósito!',
		you_withdrawn: 'Você retirou com sucesso!'
	},
	ExchangeResumeScreen: {
		exchange_resume: 'Confirmação',
		rate_fixed_for: 'Cotação fixa por:',
		rate: 'Cotação',
		swapping_via: 'Convertendo via'
	},
	ExchangeScreen: {
		fetching: 'Buscando...',
		exchange: 'Converter',
		review: 'Revisar',
		GasSelector: {
			GasOption: {
				transaction_fee: 'Taxa da transação',
				fast: 'Rápido',
				normal: 'Normal',
				slow: 'Devagar'
			}
		}
	},
	ManualBackupScreen: {
		CopyButton: {
			copy_to_clipboard: 'Copiar para área de transferência'
		},
		done: 'Pronto',
		recovery_phrase: 'Frase de recuperação',
		write_this_down: 'Escreva num papel ou salve no seu gerenciador de senhas.',
		address_copied: 'Endereço copiado!',
		Warning: {
			minke_will_never_ask: 'A Minke nunca solicita essas palavras',
			anyone_who_has_these: 'Com elas qualquer um pode acessar sua carteira!'
		}
	},
	SaveScreen: {
		interest: '% de juros anuais',
		EmptyState: {
			save: 'Investir',
			open_savings_account: 'Abrir Conta\nde investimentos na %{protocol}',
			lets_make_first_deposit: 'Vamos fazer seu primeiro depósito?'
		},
		Header: {
			save: 'Investir'
		},
		CurrentValue: {
			current_deposits: 'Depósitos',
			withdraw: 'Retirar',
			deposit: 'Depositar'
		},
		Body: {
			deposit: 'Depósito ({{source}})'
		},
		InfoModal: {
			Aave: 'Conta de investimentos da Aave'
		},
		MStable: {
			MStable: 'Conta de investimentos na mStable'
		}
	},
	SavingAccountsScreen: {
		title: 'Conta de investimentos'
	},
	SettingsScreen: {
		title: 'Configurações',
		creating_wallet: 'Criando carteira',
		backup: 'Backup',
		country: 'País',
		language: 'Idioma',
		network: 'Rede',
		new_wallet: 'Nova carteira',
		usd_coin: 'Moeda padrão USD',
		contact_support: 'Contactar suporte',
		switch_account: 'Trocar carteira',
		my_wallet: 'Minha Carteira',
		my_account: 'Minha Conta',
		help: 'Ajuda',
		other: 'Outros',
		savings_account: 'Conta de Investimentos'
	},
	TopUpWaitScreen: {
		Failed: {
			something_gone_wrong: 'Ah não! Algo de errado aconteceu. Por favor, tente mais tarde ou contate o suporte.',
			reference: 'Referência: '
		},
		Processing: {
			almost_there: 'Quase lá... isso pode levar um tempinho...',
			please_wait: 'Por favor, espere enquanto processamos o seu pagamento...'
		},
		Success: {
			funds_being_deposited: 'Seus fundos estão sendo depositados na sua carteira...',
			done: 'Pronto'
		}
	},
	TransactionsScreen: {
		Header: {
			transactions: 'Transações'
		},
		Selector: {
			all: 'Todas',
			sent: 'Enviadas',
			received: 'Recebidas'
		}
	},
	USDCoinScreen: {
		usd_asset: 'Moeda padrão USD '
	},
	WalletAssetsScreen: {
		header: 'Carteira',
		ValueBox: {
			current_value: 'Valor atual'
		},
		AssetList: {
			Header: {
				asset_header: 'Ativo'
			},
			Selector: {
				all_coins: 'Todas as moedas',
				stable_coins: 'Moedas estáveis'
			},
			Card: {
				your_wallet_balance: 'Seu saldo'
			}
		},
		AssetListEmpty: {
			no_tokens_yet: 'Ainda não tem nenhum token',
			lets_buy_some: 'Vamos comprar algum?',
			add_funds_to_start: 'Adicione fundos para começar'
		}
	},
	WalletCreatedScreen: {
		wallet_created: 'Carteira Criada!',
		need_backup:
			'Você precisar fazer backup da sua carteira. Mantenha o seu backup seguro pois se perdê-lo todos os seus ativos estarão em risco.',
		modal_error: 'Erro de backup'
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
			exchange: 'Converter',
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
			see_all: 'Ver todas'
		},
		screens: {
			Accounts: {
				wallet: 'Carteira',
				available_funds_in_your_wallet: 'Fundos na sua carteira',
				savings: 'Investimentos',
				funds_deposited_in_savings: 'Fundos investidos',
				borrowing: 'Empréstimos',
				open_loans: 'Empréstimos em aberto',
				coming_soon: 'Em breve'
			},
			Transactions: {
				NoTransactionsYet: {
					no_transactions_here: 'Nenhuma transação aqui',
					lets_get_started: 'Vamos começar?'
				}
			}
		},
		Modals: {
			ReceiveModal: {
				receive: 'Receber',
				show_qr: 'Mostre seu código QR ou compartilhe suas informações'
			},
			SendModal: {
				components: {
					Card: {
						available: ' Disponível'
					},
					GasPriceLine: {
						speed: 'Velocidade: ',
						network_fee: ' Taxa da rede'
					}
				},
				screens: {
					AddContact: {
						add_contact: 'Adicionar Contato'
					},
					TransactionContacts: {
						sent_to_address: 'Envie para algum endereço',
						address_or_ens: 'Endereço ou ENS',
						choose_from_saved: 'Ou escolha um endereço já salvo',
						NoContactsYet: {
							no_contacts_yet: 'Nenhum contato disponível',
							add_some: 'Adicione alguns para começar'
						}
					},
					TransactionSelectFunds: {
						which: 'Qual ',
						asset: 'token',
						want_to_send: 'você deseja enviar para ',
						Card: {
							available: ' Disponível'
						}
					},
					TransactionTransfer: {
						how_much: 'Quantos ',
						wanna_send: ' você quer enviar?'
					}
				}
			}
		}
	},
	WelcomeScreen: {
		wave_goodbye: 'Diga adeus ao seu banco!',
		easily: 'Economize, gaste e invista facilmente com a',
		creating: 'Criando carteira',
		create: 'Criar Carteira',
		import_or_restore: 'Importar ou Restaurar Carteira',
		ImportWalletModal: {
			add_wallet: 'Adicionar Carteira',
			seed_or_key: 'Frase de recuperação ou chave privada',
			importing: 'Importando carteira',
			import: 'Importar Carteira',
			SelectImportMethodModal: {
				import_wallet: 'Importar Carteira',
				restore_from_icloud: 'Restaurar do iCloud',
				backup_wallets_count: 'Você tem %{count} carteira%{plural} backed up',
				import_with_secret_phrase: 'Importar com frase de recuperação ou chave privada'
			}
		}
	},
	WithdrawScreen: {
		withdraw: 'Retirar',
		balance: 'Saldo: '
	},
	Hooks: {
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
		}
	},
	Containers: {
		AddFunds: {
			LocalCurrencyModal: {
				choose_another_amount: 'Escolha outro valor'
			},
			ChooseQuantityModal: {
				buy_some: 'Compre alguns {{symbol}} com ',
				to_start_using: ' para começar a usar a Minke:',
				choose_another_amount: 'Escolha outro valor',
				or_deposit: 'ou deposite',
				send_from: 'Envie pela ',
				or_another_exchange: ' ou por outra corretora',
				copy_address: 'Copiar o endereço',
				address_copied: 'Endereço copiado!'
			},
			CoinSelectorModal: {
				add_funds: 'Adicione fundos',
				choose_asset: 'Escolha qual token gostaria de comprar'
			},
			CustomAmountModal: {
				choose_another_amount: 'Escolha outro valor entre {{min}} e {{max}}',
				use_a_debit_card: 'Use um cartão de débito'
			}
		}
	},
	Components: {
		AaveReusables: {
			Info: {
				open_account: 'Abrir uma Conta',
				aave: 'Abrir uma conta na Aave',
				what_is: 'O que é a Aave?',
				aave_des:
					'Aave permite que você ganhe juros com suas criptomoedas e stablecoins emprestando-as a quem deseja. Aave é um protocolo descentralizado para empréstimo de criptomoedas. As taxas são variáveis e podem mudar a qualquer momento.\n\nOs riscos incluem a parte econômica do protocolo, riscos de mercado, segurança dos contratos inteligentes, risco de contraparte e outros mais. O protocolo Aave foi auditado pela Trail of Bits e pela Open Zeppelin.',
				view_site: 'Ver o Site',
				learn_more: 'Ver Mais',
				this_transaction: 'Esta transação vai custar alguns centavos.'
			}
		},
		MStableReusables: {
			Info: {
				what_is: 'O que é o mStable?',
				mstable_des:
					'O mStable é uma infraestrutura autônoma e sem custódia para ativos criptográficos de valor atrelado. O protocolo foi criado para resolver três problemas principais: \n\nfragmentação significativa em ativos criptográficos de mesma indexação (atualmente, existem pelo menos 5 ativos criptográficos indexados em dólares principais no Ethereum, por exemplo). \n\nFalta de rendimento em moedas fiduciárias e ativos criptográficos atrelados.\n\nFalta de proteção contra perda de capital permanente em ativos criptográficos atrelados.',
				view_site: 'Ver o Site',
				learn_more: 'Ver Mais'
			}
		},
		PendingTransactions: {
			pending: 'Pendente',
			success: 'Sucesso',
			failed: 'Falhou'
		},
		Transaction: {
			failed: 'Falhou',
			view_on: 'Ver em',
			cancel: 'Cancelar',
			adding_via_apple_pay: 'Adicionando via Apple Pay',
			withdrew_from_savings: 'Retirada de investimento',
			deposited_in_savings: 'Depósito de investimento',
			swap: 'Converteu %{source} para %{dest}',
			from: 'De',
			to: 'Para',
			today: 'Hoje',
			yesterday: 'Ontem',
			this_month: 'Nesse mês'
		},
		LoadingScreen: {
			this_can_take_a_few_seconds: 'Isso pode levar alguns segundos'
		},
		TokenAmountInput: {
			send_max: 'Enviar o máximo'
		},
		NetworkWarning: {
			NetworkTag: {
				sending_on: 'Enviando na rede {{network}}'
			}
		},
		EmptyStates: {
			NoTokens: {
				no_tokens_here: 'Nenhum token'
			}
		},
		Inputs: {
			enter_password: 'Entre a senha',
			repeat_password: 'Repita a senha',
			search: 'Procurar',
			search_token: 'Procurar token',
			name: 'Nome',
			ens_or_wallet: 'ENS ou Endereço da Carteira'
		},
		Buttons: {
			backup_to_icloud: 'Fazer Backup no iCloud',
			backup_manually: 'Fazer backup manualmente',
			confirm_restore: 'Confirmar restauração',
			confirm_backup: 'Confirmar backup',
			done: 'Pronto',
			exchange: 'Converter',
			deposit: 'Depositar',
			withdraw: 'Retirar',
			ok_got_it: 'OK, entendi',
			send: 'Enviar',
			add_contact: 'Adicionar Contato',
			add_funds_to_start: 'Adicionar fundos para começar',
			share: 'Compartilhar',
			pay_with: 'Pagar com '
		},
		ModalReusables: {
			TransactionWaitModal: {
				transaction_done: 'Transação concluida',
				processing_transaction: 'Processando transação',
				sent: 'Enviou',
				deposited: 'Depositou',
				withdrew: 'Retirou',
				exchanged: 'Converteu',
				sending: 'Enviando',
				depositing: 'Depositando',
				withdrawing: 'Retirando',
				exchanging: 'Convertendo',
				in: 'em',
				for: 'para',
				transaction: 'Transação'
			},
			Error: {
				title: 'Oops!',
				description: 'Algo deu errado, nossos desenvolvedores foram notificados.',
				buttonLabel: 'Ok, entendi',
				Blockchain: {
					description: 'Algo deu errado ao falar com a Blockchain'
				}
			},
			ComingSoonModal: {
				coming_soon: 'Em breve!',
				devs_doing_something: 'Nossos devs estão trabalhando.'
			}
		},
		SettingsHeader: {
			done: 'Pronto'
		},
		TokenCard: {
			choose_token: 'Escolha um token',
			available: 'Disponível'
		},
		InterestBanner: {
			interest: '% de juros anuais'
		}
	},
	Logs: {
		couldnt_restore_backup: 'Não foi possível restaurar seus backups',
		not_enough_balance_for_gas: 'Não há saldo suficiente para gás'
	}
};
