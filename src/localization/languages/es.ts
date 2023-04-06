/* eslint-disable max-len */
export default {
	// SCREENS
	AccountsScreen: {
		import_or_restore: 'Importar o Restaurar',
		accounts: 'Cuentas'
	},
	AddFundsScreen: {
		header: 'Agregar fondos',
		you_pay: 'Pagas',
		you_receive: 'Recibes',
		Errors: {
			validation_snapx_min: 'No cumple el monto mínimo de transacción',
			exchange_sourceAmountTooSmall: 'El monto es muy bajo',
			minimal_topup_amount: 'El monto mínimo es {{amount}} {{currency}}'
		}
	},
	AssetsScreen: {
		AboutCoin: {
			about: 'Sobre '
		}
	},
	BackupSettingsScreen: {
		title: 'Copia de seguridad'
	},
	BackupStatusScreen: {
		your_wallet_is_backed_up: '¡Tu wallet esta segura!',
		if_you_lose:
			'Si pierdes este dispositivo puedes recuperar la copia de tu wallet encriptada de {{cloudPlatform}}.',
		your_wallet_is_not_backed_up: '¡Tu wallet no esta asegurada!',
		your_keys_your_coins: 'Tus llaves tus dinero. Haz una copia de seguridad en caso de perdida.',
		back_up_to_icloud: 'Copiar a {{cloudPlatform}}',
		backup: 'Copia de seguridad',
		done: 'Completo',
		view_secret_phrase: 'Ver Frase Secreta',
		backup_error: 'Error de copia de seguridad',
		go_to_wallet: 'Ir a la wallet'
	},
	BackupToICloudScreen: {
		CreateBackupPassword: {
			choose_password: 'Elige una contraseña',
			memorable_password: 'Por favor elige una contraseña que puedas recordar.',
			not_recoverable: 'No la podras recuperar!'
		},
		ConfirmBackupPassword: {
			enter_backup_password: 'Ingresa la Contraseña de la copia de seguridad',
			to: 'A',
			restore_from: ' recupera tus wallets de ',
			add_to: ' agrega esta wallet a ',
			enter_existing: 'tu {{cloudPlatform}} copia de seguridad, ingresa tu contraseña  de la copia de seguridad',
			importing_backups: 'Importando copias de seguridad'
		}
	},
	ChangeCountryScreen: {
		header_title: 'Cambiar País'
	},
	ChangeLanguageScreen: {
		header_title: 'Cambiar Idioma'
	},
	ChangeNetworkScreen: {
		header_title: 'Red Predeterminada',
		ListItem: {
			test_network: 'red de prueba'
		}
	},
	DepositScreen: {
		Congrats: {
			congrats: 'Felicidades',
			you_just: 'Hiciste tu primer depósito!',
			done: 'Hecho'
		},
		Deposit: {
			deposit: 'Deposita',
			balance: 'Balance: ',
			on: 'en'
		},
		NotAbleToSaveModal: {
			not_able: 'No fue posible depositar',
			need_funds_in: 'Primero necesitas tener fondos ',
			add_funds: 'Agregar fondos',
			exchange: 'Intercambiar'
		}
	},
	DepositWithdrawalSuccessScreen: {
		congrats: 'Felicidades!',
		you_deposited: 'Haz depositado!',
		you_withdrawn: 'Haz retirado exitosamente!'
	},
	EnterReferralCodeScreen: {
		enter_referral_code: 'Ingresa tú código',
		get_rewarded_for_saving_money: '¡Sé recompensado con mejor dinero!',
		or: 'or',
		buy_token: 'Compra {{token}}',
		referral_note:
			'Este código solo puede ser usado una vez. Después de comprar stablecoins tú y tu amigo van a recibir cada uno hasta 50 puntos Minke.',
		invalid_code: 'Código invalido',
		your_code_is_invalid: 'Tu código no existe o ya está en uso en una de tus wallets'
	},
	ExchangeResumeScreen: {
		exchange_resume: 'Confirmación',
		rate_fixed_for: 'Tasa fija por:',
		rate: 'Tasa',
		swapping_via: 'Intercambiando via',
		network: 'Red'
	},
	ExchangeScreen: {
		fetching: 'Buscando...',
		exchange: 'Intercambiar',
		review: 'Revisar',
		flip: 'Invertir',
		settings: 'Ajustes',
		GasSelector: {
			GasOption: {
				transaction_fee: 'Comision de transacción',
				fast: 'Rápido',
				normal: 'Normal',
				slow: 'Lento',
				fee_paid_in: 'Tarifa en '
			}
		},
		validations: {
			INSUFFICIENT_ASSET_LIQUIDITY: 'insuficiente liquidez de activos'
		},
		SettingsModal: {
			max_slippage: 'Slippage máxima',
			done: 'Hecho'
		}
	},
	HomeScreen: {
		Accounts: {
			AccountsOverview: {
				overview: 'Cuentas',
				see_all: 'Ver todo',
				investments_highlight: 'Inversiones destacadas',
				stablecoins: 'Stablecoins'
			},
			AccountsEmpty: {
				buy_token_now: '¡Compra {{token}} ahora!\nSin documento de identidad.',
				purchase: 'Compra en unos pocos clicks:'
			}
		},
		Assets: {
			your_total_assets: 'Balance total',
			add_funds: 'Agrega fondos',
			Modals: {
				connect_wallet: 'Connecta tu wallet',
				disconnect_wallet: 'Desconecta tu Wallet',
				import_with_secret_phrase: 'Importar con frase secreta',
				restore_from_cloud: 'Restaura de {{cloudPlatform}}',
				backup_wallets_count: 'Tienes %{count} wallet%{plural} aseguradas',
				no_backups_found: 'No se encontraron copias de seguridad',
				AvatarModal: {
					Main: {
						edit: 'Edita tu avatar',
						select: 'Selecciona un avatar de Minke',
						choose: 'Selecciona de la libreria'
					},
					Select: {
						select: 'Selecciona tu avatar'
					}
				}
			}
		},
		Header: {
			welcome: 'Bienvenido',
			points: 'puntos',
			invite_a_friend: '¡Invita a tus amigos!'
		},
		Stories: {
			learn_about_minke: 'Aprende sobre Minke'
		},
		MintNFT: {
			mint_a_minke_whale_nft: '¡Generar NFT de Minke!',
			complete_two_tasks: 'Complete dos tareas para generar su Minke NFT gratis',
			mint_nft: 'Generar NFT'
		}
	},
	ImportWalletScreen: {
		import_wallet: 'Importar Wallet',
		import_with_secret_phrase: 'Importar con frase secreta o llave privada',
		connect_wallet: 'Conectar Wallet',
		restore_from_icloud: 'Restaurar de {{cloudPlatform}}',
		backup_wallets_count: 'Tienes %{count} wallet%{plural} aseguradas',
		disconnect_wallet: 'Desconectar Wallet',
		please_change_network: 'Por favor cambia a {{network}} para conectar esta wallet.',
		Error: {
			no_network: 'No soportamos esta red. Por favor, selecciona otra red en la aplicación.'
		}
	},
	InvestmentsScreen: {
		investments: 'Inversiones',
		current_value: 'Valor actual'
	},
	InvestmentsDetailScreen: {
		MarketCap: {
			market_cap: 'Cap. de mercado',
			volume: 'Volumen (1D)'
		},
		Upper: {
			Chart: {
				Changes: {
					changes: 'Cambios',
					hour: '1 Hora',
					day: '1 Día',
					week: '1 Semana',
					month: '1 Mes',
					year: '1 Año',
					all: 'Todo'
				},
				Selection: {
					Chart: {
						'1H': '1H',
						'1D': '1D',
						'1W': '1S',
						'1M': '1M',
						'1Y': '1A',
						All: 'Todo'
					}
				}
			}
		}
	},
	ManualBackupScreen: {
		CopyButton: {
			copy_to_clipboard: 'Copiar al portapapeles'
		},
		done: 'Hecho',
		recovery_phrase: 'Frase de recuperación',
		write_this_down: 'Escribela en un papel o guardala en tu gestor de contraseñas.',
		Warning: {
			minke_will_never_ask: 'Minke te va a preguntar por estas palabras',
			anyone_who_has_these: 'Cualquiera que las tenga puede acceder a tu wallet!'
		},
		go_to_wallet: 'Ir a la wallet'
	},
	MinkeHubScreen: {
		minke_hub: 'Minke Hub',
		accounts: 'Cuentas',
		coins_pegged_to: 'Monedas pegadas al dólar',
		investments: 'Inversiones',
		fluctuating_value: 'Monedas con valor fluctuante',
		savings: 'Ahorros',
		earn_passive_income: 'Gana intereses con tus stablecoins',
		nfts_and_collectibles: 'NFTs y coleccionables',
		others: 'Otros',
		send_to_bank: 'Manda a tu banco',
		convert_to_local: 'Convierte a tu moneda local',
		referral: 'Referidos',
		refer_and_earn: 'Refiere a un amigo y gana cripto gratis',
		stablecoins: 'Stablecoins'
	},
	MintNFTScreen: {
		title: 'Generar NFT',
		claim_a_minke_whale_nft: '¡Obtén NFT de Minke!',
		complete_two_tasks: 'Completa 2 tareas para recibir tu Minke NFT gratis como recompensa por usar Minke Wallet.',
		join_telegram:
			'Únase a la comunidad de Telegram de Minke para aprender sobre criptografía y mantenerse al día con las últimas noticias.',
		join_telegram_group: 'Únete al grupo de Telegram',
		follow_our_new_onramp:
			'Siga a nuestro nuevo socio para comprar y vender criptomonedas en Twitter para obtener más información sobre cómo comprar criptomonedas P2P directamente en su wallet',
		follow_on_twitter: 'Seguir a OpenPeer en Twitter',
		you_can_mint:
			'¡Felicidades! Ahora puedes generar tu NFT sin pagar gasolina. Estará disponible en su billetera y en OpenSea.',
		mint_nft: '¡Generar NFT!',
		nft_claimed: 'NFT Generada',
		your_minke_whale_nft: 'Tu Minke NFT',
		view_on_opensea: 'Ver en OpenSea',
		already_minted: 'ya generadas',
		VerifyTelegramModal: {
			verify_telegram: 'Verificar Telegram',
			verify_telegram_membership: 'Verificar Telegram',
			verification_failed: 'Este usuario no se ha unido al grupo de Telegram'
		},
		VerifyTwitterModal: {
			verify_twitter: 'Verificar Twitter',
			verify_twitter_follower: 'Verify Seguidor de Twitter',
			verification_failed: 'Esse usuario no sigue no Twitter'
		}
	},
	NetworkModal: {
		if_you_receiving: 'Si está recibiendo de una exchange o wallet, confirme que hay soporte para na ',
		network: 'Red {{network}}'
	},
	NFTDetailScreen: {
		by: 'Por ',
		Panel: {
			floor_price: 'Precio mínimo',
			last_sale_price: 'último precio de venta'
		},
		view_on_openSea: 'Ver en OpenSea',
		about: 'Sobre'
	},
	NFTScreen: {
		assets: 'Activos',
		estimated_value: 'Valor estimado',
		InfoModal: {
			how_are_valued: '¿Cómo se valoran mis NFTs?',
			desc: 'Tus NFTs se valoran en base a una combinación entre el precio mínimo, el último precio de venta y los atributos únicos individuales.'
		}
	},
	RedeemConfirmScreen: {
		confirmation: 'Confirmación',
		rate_fixed_for: 'Tasa fija por:',
		errors: {
			failed_claim:
				'Tú canjeo no fue completado. Por favor, contacta a nuestro soporte técnico. Your redeem was not completed. Please, contact our support.',
			invalid_request: 'Pedido invalido'
		}
	},
	ReferralScreen: {
		Header: {
			points: 'Puntos'
		},
		CurrentValue: {
			pts: 'pts.',
			owned: 'Obtenidos',
			redeem: 'Canjear',
			earn: 'Ganar'
		},
		RedeemScreen: {
			redeem_minke_points: 'Canjea tus puntos Minke',
			swap: 'Intercambiar',
			Modals: {
				WrongNetwork: {
					wrong_network: 'Ups! Para que estas en la red equivocada',
					please_change_network: 'Por favor cambia a {{network}} para canjear tus puntos.',
					change_to_network: 'Cambiar a {{network}}'
				},
				NotEnoughPoints: {
					you_dont_have_points: 'Ups! No tienes puntos',
					you_can_earn: 'Puedes ganar puntos Minke:',
					referring_a_friend: 'Refiriendo a un amigo',
					topping_up: 'Agregando fondos',
					get_rewarded: '¡Sé recompensado con mejor dinero!',
					what_can_you_do_with_your_points: '¿Que puedes hacer con tus puntos?',
					you_can_redeem: 'Puedes canjear tus puntos por recompensas en USDC en Polygon.'
				}
			}
		},
		Modals: {
			HelpModal: {
				how_minke_points_work: '¿Cómo funcionan los puntos Minke?',
				rewards_explanation:
					'Los puntos Minke son recompensas que recibes cuando realizas ciertas acciones en la aplicación.',
				you_can_earn_points_by: 'Puedes ganar puntos Minke:',
				topping_up_for_the_first_time: 'Agregando fondos por primera vez.',
				refering_minke: 'Refiriendo Minke a amigos y familiares.',
				what_can_you_do: '¿Que puedes hacer con tus puntos?',
				you_can_redeem_your_points: 'Puedes canjear tus puntos por recompensas en USDC en Polygon.'
			},
			EarnModal: {
				earn_minke_points: '¡Gana puntos Minke!',
				refer_a_friend: 'Refiriendo a un amigo',
				when_your_friends_top_up:
					'Cuando tu amigo compre monedas estables, obtendrá hasta 50 puntos Minke. Obtendrá una comisión del 20% en puntos por referencia.',
				share_text:
					'¡Hola! Estuve usando Minke para ganarle a la inflación con stablecoins de valor igual al dólar. Ambos vamos a recibir hasta $5 en USDC al registrarte y hacer tu primer compra o intercambio. Mi código de invitación es {{code}} - registrate acá: https://minke.onelink.me/rwwq/ref',
				points_are_distributed:
					'Los puntos se distribuyen cada 24 horas hasta las 12:00 UTC de lunes a viernes.'
			}
		},
		Body: {
			referral: 'Referencia',
			deposit: 'Depositar',
			exchange: 'Intercambiar',
			points: '{{count}} puntos'
		}
	},
	SaveScreen: {
		interest: '% interes anual',
		EmptyState: {
			save: 'Ahorrar',
			open_savings_account: 'Abrir %{protocol}\nCuenta de Ahorro',
			lets_make_first_deposit: 'Hagamos tu primer deposito?'
		},
		Header: {
			save: 'Ahorrar'
		},
		CurrentValue: {
			current_deposits: 'Depositos actuales',
			withdraw: 'Retirar',
			deposit: 'Depositar'
		},
		Body: {
			deposit: '{{source}} deposito'
		},
		InfoModal: {
			Aave: 'Aave savings account'
		},
		MStable: {
			MStable: 'cuenta de ahorros en mStable'
		}
	},
	SearchDepositProtocols: {
		title: 'Cuenta de ahorros'
	},
	SecurityScreen: {
		title: 'Seguridad',
		require_biometric: 'Requerir identificación biométrica o PIN para realizar transacciones',
		are_you_sure: 'Estas seguro?',
		cancel: 'Cancelar'
	},
	SettingsScreen: {
		DeleteModal: {
			delete_wallet: 'Borrar wallet',
			keep_wallet: 'Mantener wallet',
			are_you_sure: 'Estas seguro que quieres borrar esta wallet?',
			recover: 'Solo la podras recuperar con tu llave privada o tu {{os}} (si esta guardada en {{os}})',
			cancel: 'Cancelar'
		},
		title: 'Ajustes',
		creating_wallet: 'Creando Wallet',
		backup: 'Copia de seguridad',
		country: 'País',
		language: 'Idioma',
		network: 'Red Predeterminada',
		new_wallet: 'Nueva Wallet',
		usd_coin: 'Activo USD',
		contact_support: 'Soporte Técnico',
		help_centre: 'Centro de Ayuda',
		switch_account: 'Cambiar de Cuenta',
		my_wallet: 'Mi Wallet',
		my_account: 'Mi cuenta',
		help: 'Ayuda',
		other: 'Otros',
		savings_account: 'Cuenta de Ahorros',
		enter_referral_code: 'Ingresa código de referencia',
		delete_wallet: 'Eliminar wallet',
		security: 'Seguridad'
	},
	StablecoinsScreen: {
		current_value: 'Valor actual',
		get_annualized_interest: '{{apy}}% interes anual',
		stablecoins: 'Stablecoins'
	},
	TopUpWaitScreen: {
		Failed: {
			something_gone_wrong:
				'Oh no! Algo salio mal. Por favor intenta otra vez mas tarde o contacta soporte técnico.',
			reference: 'Referencia: '
		},
		Processing: {
			almost_there: 'Ya casi... esto puede tomar un minuto...',
			please_wait: {
				payment: 'Por favor espera mientras procesamos tu pago...',
				transfer: 'Por favor espera mientras procesamos tu tranferencia...'
			}
		},
		Success: {
			funds_being_deposited: 'Tus fondos estan siendo depositados en tu wallet...',
			done: 'Hecho'
		}
	},
	TransactionsDetailScreen: {
		transaction_type: 'Tipo de transacción:',
		date: 'Fecha:',
		sent_to: 'Enviar a:',
		exchanged: 'Intercambiado:',
		exchange_details: '{{fromAmount}} {{from}} por {{toAmount}} {{to}}',
		hash: 'Hash',
		exchange_rate: 'Tasa de cambio',
		savings_account: 'Cuenta de Ahorro:',
		received_from: 'Recibido de:'
	},
	TransactionsScreen: {
		Header: {
			transactions: 'Transacciones'
		},
		Selector: {
			all: 'Todo',
			sent: 'Enviado',
			received: 'Recibido'
		}
	},
	USDCoinScreen: {
		usd_asset: 'Activo USD '
	},
	WalletCreatedScreen: {
		wallet_created: 'Wallet Creada!',
		need_backup:
			'Tienes que crear una copia de seguridad de tu wallet. Manten tu copia de seguridad en un lugar seguro ya que perderla pueda llevar a perder tus fondos.',
		modal_error: 'Error de copia de seguridad'
	},
	WelcomeScreen: {
		referral_code_applied: 'Código de referencia aplicado',
		wave_goodbye: 'Dile adiós\nto a la inflación!',
		easily: 'Manda, ahorra, gasta e invierte con Minke',
		creating: 'Creando wallet',
		create: 'Crear Wallet',
		import_or_restore: 'Importar Wallet',
		i_have_a_referral_code: 'Tengo un código de referencia',
		ImportWalletModal: {
			add_wallet: 'Agregar Wallet',
			seed_or_key: 'Frase semilla (seed phrase) o llave privada',
			importing: 'Importando wallet',
			import: 'Importar Wallet',
			SelectImportMethodModal: {
				import_wallet: 'Importar wallet',
				restore_from_icloud: 'Restaura de {{cloudPlatform}}',
				backup_wallets_count: 'Tienes %{count} wallet%{plural} aseguradas',
				import_with_secret_phrase: 'Importar con frase secreta o llave privada'
			}
		}
	},
	WithdrawScreen: {
		withdraw: 'Retirar',
		balance: 'Balance: '
	},

	// CONTEXTS
	AvatarContext: {
		KrakenJr: {
			name: 'Kraken Jr.',
			desc: 'Amigable pulpo de los Estados Unidos en constante busqueda de nuevas criptomonedas.'
		},
		DeShark: {
			name: 'DeShark',
			desc: 'Tiburón Australiano que ama navegar las aguas de DeFi.'
		},
		Mateus: {
			name: 'Mateus',
			desc: 'Brillante pez rape Brasilero que ahorra en stablecoins.'
		},
		Fugu: {
			name: 'Fugu',
			desc: 'Pez globo Japones principiante en cripto pero constantemente aprendiendo.'
		},
		WowFish: {
			name: 'Wow Fish',
			desc: 'Pez dorado Aleman buscando intereses sustantables.'
		}
	},
	LocationContext: {
		AT: {
			name: 'Austria',
			currencyName: 'Euro'
		},
		BE: {
			name: 'Belgica',
			currencyName: 'Euro'
		},
		BG: {
			name: 'Bulgaria',
			currencyName: 'Lev Búlgaro'
		},
		HR: {
			name: 'Croacia',
			currencyName: 'Kuna Croata'
		},
		CY: {
			name: 'Chipre',
			currencyName: 'Euro'
		},
		CZ: {
			name: 'Republica Checa',
			currencyName: 'Corona Checa'
		},
		DK: {
			name: 'Dinamarca',
			currencyName: 'Corona Danesa'
		},
		EE: {
			name: 'Estonia',
			currencyName: 'Euro'
		},
		FI: {
			name: 'Finlandia',
			currencyName: 'Euro'
		},
		FR: {
			name: 'Francia',
			currencyName: 'Euro'
		},
		DE: {
			name: 'Alemania',
			currencyName: 'Euro'
		},
		GR: {
			name: 'Grecia',
			currencyName: 'Euro'
		},
		HU: {
			name: 'Hungría',
			currencyName: 'Hungarian Forint'
		},
		IE: {
			name: 'Irlanda',
			currencyName: 'Euro'
		},
		IT: {
			name: 'Italia',
			currencyName: 'Euro'
		},
		LV: {
			name: 'Letonia',
			currencyName: 'Euro'
		},
		LT: {
			name: 'Lituania',
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
			name: 'Países Bajos',
			currencyName: 'Euro'
		},
		PL: {
			name: 'Polonia',
			currencyName: 'Złoty Polaco'
		},
		PT: {
			name: 'Portugal',
			currencyName: 'Euro'
		},
		RO: {
			name: 'Rumanía',
			currencyName: 'Leu Rumano'
		},
		SK: {
			name: 'Eslovaquia',
			currencyName: 'Euro'
		},
		SI: {
			name: 'Eslovenia',
			currencyName: 'Euro'
		},
		ES: {
			name: 'España',
			currencyName: 'Euro'
		},
		SE: {
			name: 'Suecia',
			currencyName: 'Corona Sueca'
		},
		US: {
			name: 'Estados Unidos',
			currencyName: 'Dólar Estadounidense'
		},
		EU: {
			name: 'Unión Europea',
			currencyName: 'Euro'
		},
		GB: {
			name: 'Reino Unido',
			currencyName: 'Libra Esterlina'
		},
		AU: {
			name: 'Australia',
			currencyName: 'Dólar Australiano'
		},
		CA: {
			name: 'Canadá',
			currencyName: 'Dólar Canadiense'
		},
		BR: {
			name: 'Brasil',
			currencyName: 'Real Brasileño'
		},
		TR: {
			name: 'Turquía',
			currencyName: 'Lira Turca'
		},
		AR: {
			name: 'Argentina',
			currencyName: 'Peso Argentino'
		},
		LK: {
			name: 'Sri Lanka',
			currencyName: 'Rupia de Sri Lanka'
		},
		NG: {
			name: 'Nigeria',
			currencyName: 'Naira Nigeriano'
		},
		PK: {
			name: 'Pakistan',
			currencyName: 'Rupia Paquistaní'
		},
		CH: {
			name: 'Suiza',
			currencyName: 'Franco Suizo'
		},
		CO: {
			name: 'Colombia',
			currencyName: 'Peso Colombiano'
		},
		DO: {
			name: 'Republica Dominicana ',
			currencyName: 'Peso Dominicano'
		},
		EG: {
			name: 'Egipto',
			currencyName: 'Libra Egipcia'
		},
		HK: {
			name: 'Hong Kong',
			currencyName: 'Dólar de Hong Kong'
		},
		ID: {
			name: 'Indonesia',
			currencyName: 'Rupia Indonesia'
		},
		JP: {
			name: 'Japón',
			currencyName: 'Yen Japonés'
		},
		JO: {
			name: 'Jordania',
			currencyName: 'Dólar Jordano'
		},
		KE: {
			name: 'Kenia',
			currencyName: 'Chelín Keniano'
		},
		KR: {
			name: 'South Korea',
			currencyName: 'Won Surcoreano'
		},
		KW: {
			name: 'Kuwait',
			currencyName: 'Dinar Kuwaití'
		},
		MA: {
			name: 'Morocco',
			currencyName: 'Dirham Marroquí'
		},
		MX: {
			name: 'Mexico',
			currencyName: 'Peso Mexicano'
		},
		MY: {
			name: 'Malasia',
			currencyName: 'Ringgit Malayo'
		},
		NO: {
			name: 'Noruega',
			currencyName: 'Corona Noruega'
		},
		NZ: {
			name: 'Nueva Zelanda',
			currencyName: 'Dólar Neozelandés'
		},
		OM: {
			name: 'Omán',
			currencyName: 'Rial Omaní'
		},
		PE: {
			name: 'Perú',
			currencyName: 'Sol Peruano'
		},
		SG: {
			name: 'Singapur',
			currencyName: 'Dólar de Singapur'
		},
		TH: {
			name: 'Tailandia',
			currencyName: 'Baht Tailandés'
		},
		TW: {
			name: 'Taiwán',
			currencyName: 'Dólar de Taiwán'
		},
		VN: {
			name: 'Vietnam',
			currencyName: 'Dong Vietnamita'
		},
		ZA: {
			name: 'Sudáfrica',
			currencyName: 'Rand Sudafricano'
		},
		IL: {
			name: 'Israel',
			currencyName: 'Nuevo Shekel Israelí'
		},
		CN: {
			name: 'China',
			currencyName: 'Yuan Chino'
		},
		IN: {
			name: 'India',
			currencyName: 'Indian Rupee'
		}
	},

	// HOOKS
	Hooks: {
		iCloudBackup: {
			BACKING_UP_WALLET: 'Generando copia de seguridad...',
			CREATING_WALLET: 'Creando wallet...',
			FETCHING_PASSWORD: 'Obteniendo Contraseña...',
			IMPORTING_WALLET: 'Importando...',
			RESTORING_WALLET: 'Restaurando...',
			errors: {
				KEYCHAIN_ACCESS_ERROR: 'Tiene que autenticar para proceder con la copia de seguridad',
				ERROR_DECRYPTING_DATA: 'Contraseña incorrecta! Por favor intenta otra vez.',
				NO_BACKUPS_FOUND: '¡No pudimos encontrar tu anterior copia de seguridad!',
				ERROR_GETTING_ENCRYPTED_DATA:
					'No pudimos acceder a tu copia de seguridad esta vez. Por favor intenta mas tarde.',
				GENERIC_ERROR: 'Error intentando generar la copia de seguridad. Código de error: %{code}'
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
				choose_amount_in: 'Elige el monto en {{currency}}'
			},
			ExternalExchangeModal: {
				external: 'Exchange externo',
				send_from: 'Envía de Binance, Coinbase, Kraken u otro exchange centralizado.',
				make_sure: '*Asegurate que la red seleccionada es',
				or: 'o',
				copy: 'Copia tu dirección (wallet address)'
			},
			ChooseQuantityModal: {
				select_country: 'Selecciona tu país de residencia para acceder a métodos de pago regional',
				change_country: 'Cambiar país',
				buy_some: 'Como algo de {{symbol}}',
				with: ' con',
				to_start_using: ' para empezar a usar Minke:',
				choose_another_amount: 'Elige otro monto',
				or_deposit: 'o depsoita',
				send_from: 'Manda de ',
				or_another_exchange: ' u otro exchange',
				copy_address: 'Copiar dirección',
				address_copied: '¡Dirección copiada!'
			},
			SelectorModal: {
				add_funds: 'Agregar fondos',
				buy_crypto: 'Comprar cripto',
				apple_card_transfer: '{{pay}}, tarjeta o transeferencia bancaria',
				send_from_exchange: 'Enviar de Binance, Coinbase, otros',
				external: 'Exchange externo'
			},
			CustomAmountModal: {
				choose_another_amount: 'Elige otro monto entre {{min}} y {{max}}',
				use_a_debit_card: 'Usa una tarjeta de débito'
			}
		}
	},

	// COMPONENTS
	Components: {
		AaveReusables: {
			Info: {
				what_is: 'Qué es Aave?',
				aave_des:
					'Aave te permite ganar interes con tu cripto y stablecoins ofreciendo prestamos a usuarios. Aave es un protocolo descentralizado que le permite a los usuarios prestar o tomar prestada criptomonedas. Las tarifas son variables y pueden cambiar en cualquier momento.\n\nLos riesgos incluyen la economía del protocolo, riesgos del mercado, seguridad de los contratos inteligentes, riesgos de contraparte y mas. Aave fue auditado por Trail of Bits y Open Zeppelin.',
				view_site: 'Ver Sitio',
				learn_more: 'Aprende más'
			}
		},
		AppTour: {
			Boxes: {
				Steps: {
					Step0: {
						welcome: 'Bienvenido a Minke!',
						your_new_favorite:
							'Tu nueva forma favorita de usar stablecoins como USDC y USDT. Compra, envía y ahorra sin comisiones de transacción.'
					},
					Step1: {
						add_funds: 'Agregar fondos',
						you_can_buy: 'Puedes comprar USDC en 3 clicks con Apple Pay o con tu medio de pagos local.'
					},
					Step2: {
						save: 'Ahorrar',
						earn_up_to: 'Gana hasta 5% de intereses anuales en stablecoins con mStable u Aave.'
					},
					Step3: {
						send: 'Enviar',
						send_tokens_to: 'Manda tokens a otra wallet o a un exchange como Binance o Coinbase.',
						receive: 'Recibir',
						receive_funds:
							'Reciba fondos de un amigo o envíe fondos a su wallet desde un intercambio como Coinbase.'
					},
					Step4: {
						earn_minke_points: 'Gane puntos Minke',
						refer_a_friend:
							'Recomiende a un amigo y gane hasta $10 en USDC cuando compre su primer USDC o haga un intercambio.'
					},
					Step5: {
						receive: 'Recibe',
						copy_your:
							'Recibe fondos de un amigo o envía fondos a tu wallet desde un exchange como Binance o Coinbase.',
						finish: 'Hecho'
					}
				},
				Arrow: {
					back: 'Atrás',
					next: 'Siguiente'
				}
			}
		},
		Balance: {
			balance: 'Balance',
			Buttons: {
				buy: 'Comprar',
				sell: 'Vender',
				send: 'Enviar'
			}
		},
		BlankStates: {
			NFT: 'NFTs',
			WalletAssets: 'Wallet',
			Exchange: 'Exchange',
			Save: 'Ahorrar',
			Deposit: 'Depositar',
			Withdraw: 'Retirar',
			Send: 'Qué activos quieres enviar a Which asset do you want to send to {{to}}?',
			Referral: 'Remisión'
		},
		Buttons: {
			backup_to_icloud: 'Generar copia de seguridad a {{cloudPlatform}}',
			backup_manually: 'Copiar manualmente',
			confirm_restore: 'Confirma restauración',
			confirm_backup: 'Confirma copia de seguridad',
			done: 'Hecho',
			exchange: 'Intercambiar',
			deposit: 'Depositar',
			withdraw: 'Retirar',
			ok_got_it: 'OK, listo',
			send: 'Enviar',
			add_contact: 'Agreagar Contacto',
			add_funds_to_start: 'Agrega fondo para empezar',
			share: 'Compartir',
			pay_with: 'Pagar con ',
			use_code: 'Usa código',
			loading: 'Cargando',
			swap: 'Intercambiar',
			buy_token_now: 'Compre {{token}} ahora',
			verifying: 'Verificando...'
		},
		ByNetworks: {
			by_networks: 'Redes'
		},
		CountrySelector: {
			country: 'País',
			to_offer:
				'Para ofrecerte las mejores opciones para comprar cripto por favor selecciona tu país de residencia:'
		},
		DepositProtocolSelector: {
			choose_protocol: 'Elegir cuenta de ahorros',
			change_account: 'Eligir cuenta'
		},
		EmptyStates: {
			NoTokens: {
				no_tokens_here: 'No hay tokens acá'
			},
			NoReferralPoints: {
				your_points_will_appear_here: 'Tus puntos van a aparecer acá',
				lets_get_started: '¿Empezamos?',
				earn_points: 'Gana puntos'
			},
			NoTransactions: {
				your_transactions: 'Tus transacciones van a aparecer acá',
				lets_get_started: '¿Empezamos?',
				add_funds: 'Agrega fondos para empezar'
			}
		},
		Expander: {
			show_less: 'Mostrar menos',
			show_more: 'Mostrar más'
		},
		FloatingSelector: {
			Actions: {
				exchange: 'Intercambiar',
				swap: 'Intercambia un token por otro',
				send: 'Enviar',
				receive: 'Recibir',
				to_another: 'A otra wallet o exchange',
				from_another: 'Desde otra wallet o exchange',
				transactions: 'Transacciones',
				history_of_account_transactions: 'Historial de transacciones de la cuenta'
			},
			Modals: {
				ReceiveModal: {
					receive: 'Recibir',
					show_qr: 'Muestra el código QR o comparte tu información'
				}
			}
		},
		GenericPayButton: {
			debit_credit: 'Tarjeta de Debito/Credito'
		},
		Header: {
			done: 'Hecho'
		},
		Inputs: {
			enter_password: 'Ingresa tu contraseña',
			repeat_password: 'Repite tu contraseña',
			search: 'Buscar',
			search_token: 'Buscar token',
			search_currency: 'Buscar divisa',
			name: 'Nombre',
			ens_or_wallet: 'ENS, Unstoppable Domain o Wallet Address',
			enter_code: 'Ingresa código',
			others: 'Otros',
			slippage_tolerance: 'Tolerancia a la slippage',
			enter_username: 'Introduzca su nombre de usuario'
		},
		InterestBanner: {
			interest: '% interesa anual'
		},
		LoadingScreen: {
			this_can_take_a_few_seconds: 'Esto puede tomar unos cuantos segundos'
		},
		ModalReusables: {
			TransactionWaitModal: {
				transaction_done: 'Transaccón completada',
				processing_transaction: 'Procesando Transacción',
				sent: 'Enviado',
				deposited: 'Depositado',
				withdrew: 'Retirado',
				exchanged: 'Intercambiado',
				sending: 'Enviando',
				depositing: 'Depositando',
				withdrawing: 'Retirando',
				exchanging: 'Intercambiando',
				in: 'en',
				for: 'por',
				transaction: 'Transacción'
			},
			Error: {
				title: '¡Ups!',
				description: 'Algo salió mal, nuestros desarrolladores han sido notificados.',
				buttonLabel: 'Ok, listo',
				Blockchain: {
					description: 'Algo salió mal al comunicarnos con la blockchain'
				}
			},
			ComingSoonModal: {
				coming_soon: '¡Oops!',
				devs_doing_something: 'Los desarroladores estan haciendo algo.',
				got_it: 'Ok, entendí'
			},
			SendModal: {
				components: {
					Card: {
						available: ' Disponible'
					},
					GasPriceLine: {
						speed: 'Velocidad: ',
						network_fee: ' Comision de red'
					}
				},
				screens: {
					AddContact: {
						add_contact: 'Agregar contactos'
					},
					TransactionContacts: {
						sent_to_address: 'Mandar a una dirección',
						address_or_ens: 'Dirección, ENS o Unstoppable Domain',
						choose_from_saved: 'O elige de una dirección guardada',
						NoContactsYet: {
							no_contacts_yet: 'No tienes contactos',
							add_some: 'Agrega algunos para comenzar'
						}
					},
					TransactionSelectFunds: {
						which: 'Que ',
						asset: 'activo ',
						want_to_send: 'quieres enviar a ',
						Card: {
							available: ' Disponible'
						}
					},
					TransactionTransfer: {
						how_much: 'Cuanto ',
						wanna_send: ' quieres mandar?'
					}
				},
				add: '+ Agregar'
			}
		},
		MStableReusables: {
			Info: {
				what_is: 'Qué es mStable?',
				mstable_des:
					'mStable ofrece una infraestructura autónoma y sin custodia para activos de valor fijo. El protocolo fue creado para solucionar tres problemas mayores: \n\n- La significante fragmentación que hay en cripto-activos del mismo valor (por ejemplo, actualmente hay por lo menos 5 grandes cripto-activos en Ethereum cuyo valor se encuentra pegado al dólar estadounidense). \n\n - La falta de rendimiento en el dinero fiat y cripto-activos de valor fijo \n\n - Falta de protección contra la permanente perdida de capital en cripto-activos de valor fijo.',
				view_site: 'Ver Sitio',
				learn_more: 'Aprende más'
			}
		},
		NetworkWarning: {
			NetworkTag: {
				sending_on: 'Envío en la red {{network}}',
				buying_on: 'Comprando en la red {{network}}'
			}
		},
		PendingTransactions: {
			pending: 'Pendiente',
			success: 'Exito',
			failed: 'Fallo'
		},
		Snackbar: {
			address_copied: 'Dirección copiada',
			select: 'Selecciona un País'
		},
		TokenAmountInput: {
			send_max: 'Enviar maximo'
		},
		TokenCard: {
			choose_token: 'Elige token',
			choose_currency: 'Elige divisa',
			available: 'Disponible'
		},
		TokenItemCard: {
			buy: 'Comprar'
		},
		Transaction: {
			failed: 'Fallo',
			view_on: 'Ver en',
			cancel: 'Cancelar',
			adding_via_apple_pay: 'Agregando via Apple Pay',
			withdrew_from_savings: 'Reirado',
			deposited_in_savings: 'Depositado',
			swap: 'Intercambiado',
			from: 'De',
			to: 'A',
			today: 'Hoy',
			yesterday: 'Ayer',
			this_month: 'Este Mes',
			top_up: 'Agreagar Fondos',
			savings_withdrew: 'Ahorros (retirado)',
			savings_deposited: 'Ahorros (depositado)',
			exchanged: 'Intercambiado',
			received: 'Recibido',
			sent: 'Enviado'
		},
		WatchModeTag: {
			this_wallet_needs_to_be_reconnected: 'Esta wallet necesita ser reconectada a {{network}}.',
			import_wallet: 'Importar wallet o mandar transacción'
		}
	},

	// LOGS
	Logs: {
		couldnt_restore_backup: 'No pudimos restaurar tus copias de seguridad',
		not_enough_balance_for_gas: 'No tienes fondos suficientes para pagar la comision de red'
	}
};
