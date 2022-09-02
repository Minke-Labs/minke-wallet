/* eslint-disable max-len */
export default {
	// SCREENS
	AccountsScreen: {
		import_or_restore: 'Importar ou Restaurar',
		accounts: 'Contas'
	},
	AddFundsScreen: {
		header: 'Adicionar fundos',
		you_pay: 'Você paga',
		you_receive: 'Você recebe',
		Errors: {
			validation_snapx_min: 'O valor é menor que o mínimo',
			exchange_sourceAmountTooSmall: 'O valor é muito pequeno',
			minimal_topup_amount: 'O valor mínimo é {{amount}} {{currency}}'
		}
	},
	AssetsScreen: {
		AboutCoin: {
			about: 'Sobre '
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
	EnterReferralCodeScreen: {
		enter_referral_code: 'Código de indicação',
		get_rewarded_for_saving_money: 'Receba recompensas!',
		or: 'ou',
		buy_usdc: 'Comprar USDC',
		referral_note:
			'Esse código pode ser usado somente uma vez. Depois de comprar ou converter stablecoins você e o seu amigo vão receber até 100 pontos Minke cada.',
		invalid_code: 'Código inválido',
		your_code_is_invalid: 'Seu código não existe ou já está em uso em uma das suas carteiras.'
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
	HomeScreen: {
		Accounts: {
			AccountsOverview: {
				overview: 'Visão geral das contas',
				see_all: 'Ver todos',
				investments_highlight: 'Destaques de investimentos'
			},
			AccountsEmpty: {
				buy_usdc_now: 'Compre USDC agora!\nNenhuma identificação pessoal necessária.',
				purchase: 'Compre em poucos cliques com:'
			}
		},
		Assets: {
			your_total_assets: 'Seus ativos',
			add_funds: 'Adicionar Fundos',
			Modals: {
				connect_wallet: 'Conectar Carteira',
				disconnect_wallet: 'Disconectar Carteira',
				import_with_secret_phrase: 'Importar com frase de recuperação',
				restore_from_cloud: 'Recuperar do {{cloudPlatform}}',
				backup_wallets_count: 'Você tem %{count} carteira%{plural} no backup',
				AvatarModal: {
					Main: {
						edit: 'Editar seu avatar',
						select: 'Selecionar um avatar da Minke',
						choose: 'Escolher da biblioteca'
					},
					Select: {
						select: 'Selecionar seu avatar'
					}
				}
			}
		},
		Header: {
			welcome: 'Olá',
			points: 'pontos',
			invite_a_friend: 'Convide um amigo!'
		},
		Stories: {
			learn_about_minke: 'Saiba mais sobre Minke'
		}
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
	InvestmentsScreen: {
		investments: 'Investimentos',
		current_value: 'Valor atual'
	},
	InvestmentsDetailScreen: {
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
						'1D': '1D',
						'1W': '1S',
						'1M': '1M',
						'1Y': '1A',
						All: 'Total'
					}
				}
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
	MinkeHubScreen: {
		accounts: 'Contas',
		coins_pegged_to: 'Moedas atreladas ao dólar americano',
		investments: 'Investimentos',
		fluctuating_value: 'Moedas com valor flutuante',
		savings: 'Depósitos',
		earn_passive_income: 'Ganhe renda passiva com suas stablecoins',
		nfts_and_collectibles: 'Tokens não fungíveis e colecionáveis',
		others: 'Outros',
		send_to_bank: 'Enviar ao banco',
		convert_to_local: 'Converter para sua moeda local',
		referral: 'Indicação',
		refer_and_earn: 'Indique um amigo e ganhe criptos grátis'
	},
	NFTDetailScreen: {
		by: 'por ',
		Panel: {
			floor_price: 'Preço mínimo',
			last_sale_price: 'Última venda'
		},
		view_on_openSea: 'Ver na OpenSea',
		about: 'Sobre'
	},
	NFTScreen: {
		assets: 'Ativos',
		estimated_value: 'Valor estimado',
		InfoModal: {
			how_are_valued: 'Como minhas NFTs são avaliadas?',
			desc: 'Seus NFTs são avaliados com base em uma combinação do preço mínimo da coleção, último preço de venda e atributos únicos individuais.'
		}
	},
	RedeemConfirmScreen: {
		confirmation: 'Confirmação',
		rate_fixed_for: 'Cotação fixa por:',
		errors: {
			failed_claim: 'Seu resgate não está completo. Por favor, entre em contato com o suporte.',
			invalid_request: 'Requisição inválida'
		}
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
					get_rewarded: 'Ganhe recompensas!',
					what_can_you_do_with_your_points: 'O que você pode fazer com seus pontos?',
					you_can_redeem: 'Você pode trocar seus pontos por recompensas em USDC na rede Polygon.'
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
				exchanging_for_the_first_time: 'Convertendo pela primeira vez.',
				what_can_you_do: 'O que você pode fazer com seus pontos?',
				you_can_redeem_your_points: 'Você pode trocar seus pontos por recompensas em USDC na rede Polygon. '
			},
			EarnModal: {
				earn_minke_points: 'Ganhe pontos Minke!',
				refer_a_friend: 'Indique um amigo',
				when_your_friends_top_up:
					'Quando seu amigo comprar stablecoins ou converter para elas no app da Minke vocês dois ganham até 100 points (valem $10 dólares americanos) ',
				top_up: 'Adicione Fundos',
				get_rewarded: 'Ganhe recompensas!',
				coming_soon: '(Em breve)',
				share_text:
					'Oi! Eu tenho usado Minke para vencer a inflação com stablecoins. Nós receberemos até $10 USDC quando você se inscrever e fizer seu primeiro depósito ou conversão. Meu código de convite é {{code}} - inscreva-se aqui: https://minke.onelink.me/rwwq/ref'
			}
		},
		Body: {
			referral: 'Indicação',
			deposit: 'Depósito',
			exchange: 'Conversão',
			points: '{{count}} pontos'
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
		DeleteModal: {
			delete_wallet: 'Deletar carteira',
			keep_wallet: 'Manter carteira',
			are_you_sure: 'Você tem certeza que quer deletar esta carteira?',
			recover:
				'Você só pode recuperá-la com sua chave privada ou sua senha de recuperação do {{os}} (caso armazenada no {{os}})'
		},
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
		enter_referral_code: 'Inserir código de indicação',
		delete_wallet: 'Deletar carteira'
	},
	StablecoinsScreen: {
		current_value: 'Valor atual',
		get_annualized_interest: 'Obtenha {{apy}}% de juros anualizados'
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
	TransactionScreen: {
		transaction_type: 'Transação:',
		date: 'Data:',
		sent_to: 'Enviou para:',
		exchanged: 'Converteu:',
		exchange_details: '{{fromAmount}} {{from}} para {{toAmount}} {{to}}',
		hash: 'Hash',
		exchange_rate: 'Cotação',
		savings_account: 'Conta de investimentos:',
		received_from: 'Recebido de:'
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
		ModalsImport: {
			address_copied: 'Endereço copiado!'
		},
		TransactionsTable: {
			see_all: 'Ver todas'
		},
		components: {
			Stories: {
				learn_about_minke: 'Aprenda sobre a Minke'
			}
		},
		screens: {
			Transactions: {
				NoTransactionsYet: {
					no_transactions_here: 'Nenhuma transação aqui',
					lets_get_started: 'Vamos começar?'
				}
			}
		},
		Modals: {
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
		referral_code_applied: 'Código de indicação aplicado',
		wave_goodbye: 'Diga olá para um dinheiro melhor!',
		easily: 'Economize, gaste e invista facilmente com a Minke',
		creating: 'Criando carteira',
		create: 'Criar Carteira',
		import_or_restore: 'Importar Carteira',
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

	// CONTEXTS
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
		AT: {
			name: 'Áustria',
			currencyName: 'Euro'
		},
		BE: {
			name: 'Bélgica',
			currencyName: 'Euro'
		},
		BG: {
			name: 'Bulgária',
			currencyName: 'Lev Búlgaro'
		},
		HR: {
			name: 'Croácia',
			currencyName: 'Kuna Croata'
		},
		CY: {
			name: 'Chipre',
			currencyName: 'Euro'
		},
		CZ: {
			name: 'República Tcheca',
			currencyName: 'Coroa Tcheca'
		},
		DK: {
			name: 'Dinamarca',
			currencyName: 'Coroa Dinamarquesa'
		},
		EE: {
			name: 'Estônia',
			currencyName: 'Euro'
		},
		FI: {
			name: 'Finlândia',
			currencyName: 'Euro'
		},
		FR: {
			name: 'França',
			currencyName: 'Euro'
		},
		DE: {
			name: 'Alemanha',
			currencyName: 'Euro'
		},
		GR: {
			name: 'Grécia',
			currencyName: 'Euro'
		},
		HU: {
			name: 'Hungria',
			currencyName: 'Florim Húngaro'
		},
		IE: {
			name: 'Irlanda',
			currencyName: 'Euro'
		},
		IT: {
			name: 'Itália',
			currencyName: 'Euro'
		},
		LV: {
			name: 'Letônia',
			currencyName: 'Euro'
		},
		LT: {
			name: 'Lituânia',
			currencyName: 'Euro'
		},
		LU: {
			name: 'Luxemburgo',
			currencyName: 'Euro'
		},
		MT: {
			name: 'Malta',
			currencyName: 'Euro'
		},
		NL: {
			name: 'Países Baixos',
			currencyName: 'Euro'
		},
		PL: {
			name: 'Polônia',
			currencyName: 'Zloty'
		},
		PT: {
			name: 'Portugal',
			currencyName: 'Euro'
		},
		RO: {
			name: 'Roménia',
			currencyName: 'Leu Romeno'
		},
		SK: {
			name: 'Eslováquia',
			currencyName: 'Euro'
		},
		SI: {
			name: 'Eslovênia',
			currencyName: 'Euro'
		},
		ES: {
			name: 'Espanha',
			currencyName: 'Euro'
		},
		SE: {
			name: 'Suécia',
			currencyName: 'Coroa Sueca'
		},
		US: {
			name: 'Estados Unidos',
			currencyName: 'Dólar Americano'
		},
		EU: {
			name: 'União Europeia',
			currencyName: 'Euro'
		},
		GB: {
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
		TR: {
			name: 'Turquia',
			currencyName: 'Lira Turca'
		},
		AR: {
			name: 'Argentina',
			currencyName: 'Peso Argentina'
		},
		LK: {
			name: 'Sri Lanka',
			currencyName: 'Rúpia Cingalesa'
		},
		NG: {
			name: 'Nigéria',
			currencyName: 'Naira'
		},
		PK: {
			name: 'Paquistão',
			currencyName: 'Rúpia Paquistanesa'
		},
		CH: {
			name: 'Suíça',
			currencyName: 'Franco Suíço'
		},
		CO: {
			name: 'Colômbia',
			currencyName: 'Peso Colombiano'
		},
		DO: {
			name: 'República Dominicana',
			currencyName: 'Peso Dominicano'
		},
		EG: {
			name: 'Egito',
			currencyName: 'Libra Egípcia'
		},
		HK: {
			name: 'Hong Kong',
			currencyName: 'Dólar de Hong Kong'
		},
		ID: {
			name: 'Indonésia',
			currencyName: 'Rúpia indonésia'
		},
		JP: {
			name: 'Japão',
			currencyName: 'Yen'
		},
		JO: {
			name: 'Jordânia',
			currencyName: 'Dinar Jordaniano'
		},
		KE: {
			name: 'Quênia',
			currencyName: 'Xelim Queniano'
		},
		KR: {
			name: 'Coréia do Sul',
			currencyName: 'Won Sul-Coreano'
		},
		KW: {
			name: 'Kuwait',
			currencyName: 'Dinar Kuwaitiano'
		},
		MA: {
			name: 'Marrocos',
			currencyName: 'Dirham Marroquino'
		},
		MX: {
			name: 'México',
			currencyName: 'Peso Mexicano'
		},
		MY: {
			name: 'Malásia',
			currencyName: 'Ringgit Malaio'
		},
		NO: {
			name: 'Noruega',
			currencyName: 'Coroa Norueguesa'
		},
		NZ: {
			name: 'Nova Zelândia',
			currencyName: 'Dólar Neozelandês'
		},
		OM: {
			name: 'Omã',
			currencyName: 'Rial Omanense'
		},
		PE: {
			name: 'Peru',
			currencyName: 'Sol'
		},
		SG: {
			name: 'Singapura',
			currencyName: 'Dólar de Singapura'
		},
		TH: {
			name: 'Tailândia',
			currencyName: 'Bath Tailandês'
		},
		TW: {
			name: 'Taiwan',
			currencyName: 'Dólar de Taiwan'
		},
		VN: {
			name: 'Vietnam',
			currencyName: 'Dong'
		},
		ZA: {
			name: 'África do Sul',
			currencyName: 'Rand Sul-Africano'
		},
		IL: {
			name: 'Israel',
			currencyName: 'Novo Shekel Israelense'
		},
		CN: {
			name: 'China',
			currencyName: 'Yuan Chinês'
		}
	},

	// HOOKS
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

	// CONTAINERS
	Containers: {
		AddFunds: {
			Header: {
				country: 'País'
			},
			LocalCurrencyModal: {
				choose_amount_in: 'Escolha o valor em {{currency}}'
			},
			ExternalExchangeModal: {
				external: 'Exchange externa',
				send_from: 'Envie da Binance, Coinbase, Kraken ou outra exchange centralizada.',
				make_sure: '*Se certifique que a rede selecionada seja a ',
				or: 'ou',
				copy: 'Copiar endereço da carteira'
			},
			ChooseQuantityModal: {
				select_country: 'Selecione seu país de residência para acessar sua opção de pagamento local',
				change_country: 'Mude o país',
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
			SelectorModal: {
				add_funds: 'Adicionar fundos',
				buy_crypto: 'Comprar cripto',
				apple_card_transfer: '{{pay}}, cartão ou transferência',
				send_from_exchange: 'Enviar da Binance, Coinbase, outras',
				external: 'Exchange externa'
			},
			CustomAmountModal: {
				choose_another_amount: 'Escolha outro valor entre {{min}} e {{max}}',
				use_a_debit_card: 'Use um cartão de débito'
			}
		}
	},

	// COMPONENTS
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
		AppTour: {
			Boxes: {
				Steps: {
					Step0: {
						welcome: 'Bem-vindo a Minke!',
						your_new_favorite:
							'Sua nova maneira favorita de usar stablecoins como USDC e USDT. Compre, envie, economize e invista com zero taxas de gás.'
					},
					Step1: {
						add_funds: 'Adicione fundos',
						you_can_buy:
							'Você pode comprar USDC em 3 cliques com o Apple Pay ou com sua solução de pagamento local.'
					},
					Step2: {
						save: 'Poupe e Invista',
						earn_up_to: 'Obtenha até 5% de juros anuais em stablecoins ou invista em outros tokens sem taxas de gás.'
					},
					Step3: {
						send: 'Envie',
						send_tokens_to: 'Envie tokens para outra carteira ou para uma exchange como Binance ou Coinbase.',
						receive: 'Receba',
						receive_funds: 'Receba de um amigo ou envie de uma corretora como a Coinbase para a sua carteira.'
					},
					Step4: {
						earn_minke_points: 'Obtenha pontos da Minke',
						refer_a_friend: 'Indique um amigo e ganhe até $10 em USDC quando ele fizer sua primeira compra em USDC ou uma troca.'
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
		Balance: {
			balance: 'Saldo',
			Buttons: {
				buy: 'Comprar',
				sell: 'Vender',
				send: 'Enviar'
			}
		},
		BlankStates: {
			NFT: 'NFTs',
			WalletAssets: 'Carteira',
			Exchange: 'Converter',
			Save: 'Investir',
			Deposit: 'Depositar',
			Withdraw: 'Retirar',
			Send: 'Qual token você deseja enviar para {{to}}?'
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
			swap: 'Trocar',
			buy_usdc_now: 'Compre USDC agora'
		},
		CountrySelector: {
			country: 'País',
			to_offer:
				'Para oferecer a você as melhores opções de compra de criptomoedas, selecione seu país de residência:',
			select: 'Selecione um País'
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
		Expander: {
			show_less: 'Ver menos',
			show_more: 'Ver mais'
		},
		FloatingSelector: {
			Actions: {
				exchange: 'Converter',
				swap: 'Troque um token por outro',
				send: 'Enviar',
				receive: 'Receber',
				to_another: 'Para outra carteira ou exchange',
				from_another: 'De outra carteira ou exchange',
				transactions: 'Transações'
			},
			Modals: {
				ReceiveModal: {
					sending_on: 'Enviando na',
					receive: 'Receber',
					show_qr: 'Mostre seu código QR ou compartilhe suas informações'
				}
			}
		},
		GenericPayButton: {
			debit_credit: 'Cartão de Débito/Crédito'
		},
		Inputs: {
			enter_password: 'Entre a senha',
			repeat_password: 'Repita a senha',
			search: 'Procurar',
			search_token: 'Procurar token',
			search_currency: 'Procurar moeda',
			name: 'Nome',
			ens_or_wallet: 'ENS ou Endereço da Carteira',
			enter_code: 'Digitar código'
		},
		InterestBanner: {
			interest: '% de juros anuais'
		},
		LoadingScreen: {
			this_can_take_a_few_seconds: 'Isso pode levar alguns segundos'
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
				devs_doing_something: 'Nossos devs estão trabalhando.',
				got_it: 'Ok, entendi'
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
		NetworkWarning: {
			NetworkTag: {
				sending_on: 'rede {{network}}'
			}
		},
		PendingTransactions: {
			pending: 'Pendente',
			success: 'Sucesso',
			failed: 'Falhou'
		},
		SettingsHeader: {
			done: 'Pronto'
		},
		Snackbar: {
			address_copied: 'Endereço copiado'
		},
		TokenAmountInput: {
			send_max: 'Enviar o máximo'
		},
		TokenCard: {
			choose_token: 'Escolha um token',
			choose_currency: 'Escolha uma moeda',
			available: 'Disponível'
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
			this_month: 'Nesse mês',
			top_up: 'Adicionou Fundos',
			savings_withdrew: 'Retirada',
			savings_deposited: 'Investimento',
			exchanged: 'Converteu',
			received: 'Recebeu',
			sent: 'Enviou'
		},
		WatchModeTag: {
			this_wallet_needs_to_be_reconnected: 'Essa carteira precisa ser reconectada à rede {{network}}.',
			import_wallet: 'Importe essa carteira para fazer transações'
		}
	},

	// LOGS
	Logs: {
		couldnt_restore_backup: 'Não foi possível restaurar seus backups',
		not_enough_balance_for_gas: 'Não há saldo suficiente para gás'
	}
};
