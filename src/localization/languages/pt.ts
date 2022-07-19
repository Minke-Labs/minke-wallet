/* eslint-disable max-len */
export default {
	AvatarContext: {
		KrakenJr: {
			name: 'Kraken Jr.',
			desc: 'Um polvo amigável vindo dos EUA que está constantemente perseguindo novas moedas.'
		},
		DeShark: {
			name: 'DeShark',
			desc: 'O tubarão australiano que adora navegar nas águas do DeFi.'
		},
		Mateus: {
			name: 'Mateus',
			desc: 'Um brilhante peixe pescador brasileiro economizando em stablecoins.'
		},
		Fugu: {
			name: 'Fugu',
			desc: 'O baiacu Japonês que é novo em criptomoedas, mas está constantemente aprendendo.'
		},
		WowFish: {
			name: 'Wow Fish',
			desc: 'Um peixe dourado alemão que está sempre em busca de rendimentos sustentáveis.'
		}
	},
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
		},
		TUR: {
			name: 'Turquia',
			currencyName: 'Lira Turca'
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
		if_you_lose:
			'Se você perder esse dispositivo poderá recuperar sua carteira através do backup no {{cloudPlatform}}.',
		your_wallet_is_not_backed_up: 'Sua carteira não tem backup!',
		your_keys_your_coins: 'Faça backup para não correr o risco de perder sua carteira.',
		back_up_to_icloud: 'Backup no {{cloudPlatform}}',
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
			restore_from: ' restaurar suas carteiras do ',
			add_to: ' adicionar esta carteira ao seu ',
			enter_existing: 'backup do {{cloudPlatform}}, digite sua senha de backup existente',
			importing_backups: 'Importando backups'
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
			mstable: 'Abrir uma conta na mStable',
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
		},
		validations: {
			INSUFFICIENT_ASSET_LIQUIDITY: 'Não há liquidez insuficiente para o token'
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
		creating_wallet: 'Criando Carteira',
		backup: 'Backup',
		country: 'País',
		language: 'Idioma',
		network: 'Rede',
		new_wallet: 'Nova Carteira',
		usd_coin: 'Moeda Padrão USD',
		contact_support: 'Contactar Suporte',
		help_centre: 'Central de Ajuda',
		switch_account: 'Trocar Carteira',
		my_wallet: 'Minha Carteira',
		my_account: 'Minha Conta',
		help: 'Ajuda',
		other: 'Outros',
		savings_account: 'Conta de Investimentos',
		enter_referral_code: 'Inserir código de indicação'
	},
	TopUpWaitScreen: {
		Failed: {
			something_gone_wrong: 'Ah não! Algo de errado aconteceu. Por favor, tente mais tarde ou contate o suporte.',
			reference: 'Referência: '
		},
		Processing: {
			almost_there: 'Quase lá... isso pode levar um tempinho...',
			please_wait: {
				payment: 'Por favor, espere enquanto processamos o seu pagamento...',
				transfer: 'Por favor, espere enquanto processamos a sua transferência...'
			}
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
		AppTour: {
			Boxes: {
				Steps: {
					Step0: {
						welcome: 'Bem-vindo a Minke!',
						your_new_favorite:
							'Sua nova maneira favorita de economizar em stablecoins e ganhar até 5% de juros anuais.'
					},
					Step1: {
						add_funds: 'Adicione fundos',
						you_can_buy:
							'Você pode comprar USDC em 3 cliques com o Apple Pay ou com sua solução de pagamento local.'
					},
					Step2: {
						save: 'Poupe',
						get_up_to: 'Obtenha até 5% de juros anuais em stablecoins com mStable ou Aave.'
					},
					Step3: {
						send: 'Envie',
						send_tokens_to:
							'Envie tokens para outra carteira ou para uma exchange como Binance ou Coinbase.'
					},
					Step4: {
						exchange: 'Converta',
						swap: 'Converta de um token para outro.'
					},
					Step5: {
						receive: 'Receba',
						copy_your: 'Receba de um amigo ou envie de uma corretora como a Coinbase para a sua carteira.',
						finish: 'Finalizar'
					}
				},
				Arrow: {
					back: 'Voltar',
					next: 'Próximo'
				}
			}
		},
		Content: {
			transactions: 'Transações',
			accounts: 'Contas'
		},
		Header: {
			welcome: 'Olá',
			points: 'pontos'
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
		components: {
			Stories: {
				whats_new: 'Quais são as novidades?'
			}
		},
		screens: {
			Accounts: {
				wallet: 'Carteira',
				available_funds_in_your_wallet: 'Fundos na sua carteira',
				savings: 'Investimentos',
				funds_deposited_in_savings: 'Fundos investidos',
				borrowing: 'Empréstimos',
				open_loans: 'Empréstimos em aberto',
				coming_soon: 'Em breve',
				points: 'Pontos',
				points_earned: 'Indique um amigo, receba crypto'
			},
			Transactions: {
				NoTransactionsYet: {
					no_transactions_here: 'Nenhuma transação aqui',
					lets_get_started: 'Vamos começar?'
				}
			}
		},
		Modals: {
			AvatarModal: {
				Chosen: {
					edit: 'Editar seu avatar',
					select: 'Selecionar um avatar da Minke',
					choose: 'Escolher da biblioteca'
				},
				Select: {
					select: 'Selecionar seu avatar'
				}
			},
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
				},
				add: '+ Adicionar'
			}
		}
	},
	WelcomeScreen: {
		wave_goodbye: 'Diga adeus ao seu banco!',
		easily: 'Economize, gaste e invista facilmente com a',
		creating: 'Criando carteira',
		create: 'Criar Carteira',
		import_or_restore: 'Importar ou Restaurar Carteira',
		i_have_a_referral_code: 'Eu tenho um código de indicação',
		ImportWalletModal: {
			add_wallet: 'Adicionar Carteira',
			seed_or_key: 'Frase de recuperação ou chave privada',
			importing: 'Importando carteira',
			import: 'Importar Carteira',
			SelectImportMethodModal: {
				import_wallet: 'Importar Carteira',
				restore_from_icloud: 'Restaurar do {{cloudPlatform}}',
				backup_wallets_count: 'Você tem %{count} carteira%{plural} no backup',
				import_with_secret_phrase: 'Importar com frase de recuperação ou chave privada'
			}
		}
	},
	WithdrawScreen: {
		withdraw: 'Retirar',
		balance: 'Saldo: '
	},
	ReferralScreen: {
		Header: {
			points: 'Pontos'
		},
		CurrentValue: {
			pts: 'pts.',
			owned: 'Meus pontos',
			redeem: 'Resgatar',
			earn: 'Ganhar'
		},
		RedeemScreen: {
			redeem_minke_points: 'Resgatar Pontos Minke',
			swap: 'Resgatar',
			Modals: {
				WrongNetwork: {
					wrong_network: 'Oops! Parece que você está na rede errada',
					please_change_network: 'Por favor, mude para a rede {{network}} para resgatar os seus pontos.',
					change_to_network: 'Mudar para {{network}}'
				},
				NotEnoughPoints: {
					you_dont_have_points: 'Oops! Você não tem pontos',
					you_can_earn: 'Você pode ganhar pontos:',
					referring_a_friend: 'Indicando um amigo',
					topping_up: 'Adicionando fundos',
					get_rewarded: 'Ganhe recompensas por investir!',
					what_can_you_do_with_your_points: 'O que você pode fazer com seus pontos?',
					you_can_redeem: 'Você pode trocar seus pontos por MATIC.'
				}
			}
		},
		Modals: {
			HelpModal: {
				how_minke_points_work: 'Como os pontos Minke funcionam?',
				rewards_explanation:
					'Pontos Minke são recompensas que te damos quando você realiza determinadas tarefas no aplicativo.',
				you_can_earn_points_by: 'Você pode ganhar pontos por:',
				topping_up_for_the_first_time: 'Adicionar fundos pela primeira vez.',
				refering_minke: 'Indicando a Minke para seus amigos e família.',
				setting_recurrent_top_ups: 'Configurando depósitos recorrentes.',
				what_can_you_do: 'O que você pode fazer com seus pontos?',
				you_can_redeem_your_points: 'Você pode trocar seus pontos por MATIC.'
			},
			EarnModal: {
				earn_minke_points: 'Ganhe pontos Minke!',
				refer_a_friend: 'Indique um amigo',
				when_your_friends_top_up: 'Quando seu amigo adicionar 100 USDC vocês dois ganham pontos Minke.',
				top_up: 'Adicione Fundos',
				get_rewarded: 'Ganhe recompensas por investir!',
				coming_soon: '(Em breve)',
				share_text:
					'Oi! Eu tenho usado Minke para economizar e ganhar 20x mais que no meu banco. Ambos receberemos 100 pontos Minke(~ 10 USD com os quais você pode comprar criptomoedas) quando você se inscrever e fizer seu primeiro depósito de 100 USD ou mais. Meu código é {{code}} - inscreva-se aqui: https://apps.apple.com/pt/app/minke-defi-wallet/id1585144414'
			}
		},
		Body: {
			referral: 'Indicação',
			deposit: 'Depósito',
			points: '{{count}} pontos'
		}
	},
	RedeemConfirmScreen: {
		confirmation: 'Confirmação',
		rate_fixed_for: 'Cotação fixa por:',
		errors: {
			failed_claim: 'Seu resgate não está completo. Por favor, entre em contato com o suporte.',
			invalid_request: 'Requsição inválida'
		}
	},
	EnterReferralCodeScreen: {
		enter_referral_code: 'Código de indicação',
		get_rewarded_for_saving_money: 'Receba recompensas por investir!',
		or: 'ou',
		refer_a_friend: 'Indique um amigo',
		referral_note:
			'Esse código pode ser usado somente uma vez. Depois de adicionar 100 USDC você e o seu amigo vão receber 100 pontos Minke cada.',
		invalid_code: 'Código inválido',
		your_code_is_invalid: 'Seu código não existe ou já está em uso em uma das suas carteiras.'
	},
	ImportWalletScreen: {
		import_wallet: 'Importar Carteira',
		import_with_secret_phrase: 'Importar com frase de recuperação ou chave privada',
		connect_wallet: 'Conectar Carteira',
		restore_from_icloud: 'Recuperar do {{cloudPlatform}}',
		backup_wallets_count: 'Você tem %{count} carteira%{plural} no backup',
		disconnect_wallet: 'Disconectar Carteira',
		please_change_network: 'Por favor, mude para a rede {{network}} para usar essa carteira.',
		Error: {
			no_network: 'Nós ainda não suportamos essa rede. Por favor, selecione outra rede no aplicativo da carteira.'
		}
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
				choose_amount_in: 'Escolha o valor em {{currency}}'
			},
			ChooseQuantityModal: {
				buy_some: 'Compre alguns {{symbol}}',
				with: ' com',
				to_start_using: ' para começar a usar a Minke:',
				choose_another_amount: 'Escolha outro valor',
				or_deposit: 'ou deposite',
				send_from: 'Envie pela ',
				or_another_exchange: ' ou por outra corretora',
				copy_address: 'Copiar o endereço',
				address_copied: 'Endereço copiado!'
			},
			CoinSelectorModal: {
				add_funds: 'Adicionar fundos',
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
				what_is: 'O que é a Aave?',
				aave_des:
					'Aave permite que você ganhe juros com suas criptomoedas e stablecoins emprestando-as a quem deseja. Aave é um protocolo descentralizado para empréstimo de criptomoedas. As taxas são variáveis e podem mudar a qualquer momento.\n\nOs riscos incluem a parte econômica do protocolo, riscos de mercado, segurança dos contratos inteligentes, risco de contraparte e outros mais. O protocolo Aave foi auditado pela Trail of Bits e pela Open Zeppelin.',
				view_site: 'Ver o Site',
				learn_more: 'Ver Mais'
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
			withdrew_from_savings: 'Retirou',
			deposited_in_savings: 'Depositou',
			swap: 'Converteu',
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
				no_tokens_here: 'Nenhum token {{network}}'
			},
			NoReferralPoints: {
				your_points_will_appear_here: 'Seus pontos aparecerão aqui',
				lets_get_started: 'Vamos começar?',
				earn_points: 'Ganhar pontos'
			}
		},
		Inputs: {
			enter_password: 'Entre a senha',
			repeat_password: 'Repita a senha',
			search: 'Procurar',
			search_token: 'Procurar token',
			name: 'Nome',
			ens_or_wallet: 'ENS ou Endereço da Carteira',
			enter_code: 'Digitar código'
		},
		Buttons: {
			backup_to_icloud: 'Fazer Backup no {{cloudPlatform}}',
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
			pay_with: 'Pagar com ',
			use_code: 'Usar código',
			loading: 'Carregando',
			swap: 'Trocar'
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
		},
		WatchModeTag: {
			this_wallet_needs_to_be_reconnected: 'Essa carteira precisa ser reconectada à rede {{network}}.',
			import_wallet: 'Importe essa carteira para fazer transações'
		}
	},
	Logs: {
		couldnt_restore_backup: 'Não foi possível restaurar seus backups',
		not_enough_balance_for_gas: 'Não há saldo suficiente para gás'
	}
};
