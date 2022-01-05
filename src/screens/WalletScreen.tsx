import React, { useCallback } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Appbar, Button, Card, Dialog, Portal, Snackbar, useTheme } from 'react-native-paper';
import { globalWalletState } from '../stores/WalletStore';
import AppLoading from 'expo-app-loading';
import { useState } from '@hookstate/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { walletDelete } from '../model/wallet';
import { BigNumberish } from 'ethers';
import { commify, formatEther, formatUnits } from 'ethers/lib/utils';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './home/styles';
import { Svg, Path } from 'react-native-svg';
// Images
import avatar from './home/avatar-test.png';
import transationalReceive from './home/transational-receive.png';
import transationalSent from './home/transational-sent.png';
import waveLower from './home/wave-lower.png';
import waveBigger from './home/wave-bigger.png';

export function WalletScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const state = useState(globalWalletState());
	const snackbarVisible = useState(false);
	const dialogVisible = useState(false);
	const { colors } = useTheme();

	const [selectedTab, setSelectedTab] = React.useState('transactions');

	if (state.promised) return <AppLoading />;

	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		state.set({ wallet: null, walletId: null });
		navigation.navigate('Welcome');
	}, [navigation]);

	const onCopyToClipboard = () => {
		Clipboard.setString(state.value.wallet?.address || '');
		snackbarVisible.set(true);
	};

	const onTransfer = () => {
		navigation.navigate('TransactionSelectFunds');
	};

	const onShareAddress = () => {
		dialogVisible.set(true);
	};

	const roundTabNetWorthPath = 'M0 15.0.0 15.0 0.5 15.0 0.8 15.9C9.6 15.9 16.9 9.1 18 0.324615L18 16H0V15.9Z';
	const roundTabTransactionPath =
		'M47 37.9.2 37.9 45.4 37.9 44.7 37.9C21.7 37.9 2.7 21.3 0 -0.191559V38.0001H47V37.9431Z';
	const roundTabNetWorth = '18 14';
	const roundTabTransaction = '36 36';
	let roundTab = roundTabTransaction;
	let roundTabPath = roundTabTransactionPath;

	if (selectedTab === 'net_worth') {
		roundTab = roundTabNetWorth;
		roundTabPath = roundTabNetWorthPath;
	}

	return (
		<View style={styles.container}>
			<Appbar.Header style={styles.appBar}>
				<View style={styles.appBarContent}>
					<View>
						<Text>Welcome</Text>
						<Text style={styles.appBarUserName}>Marcos</Text>
					</View>
					<Appbar.Content title="" />
					<View style={styles.appBarIcons}>
						<TouchableOpacity onPress={onTransfer} style={(styles.cardActionButton, styles.appBarIcon)}>
							<Image source={waveLower} style={styles.appBarIcon} />
						</TouchableOpacity>
						<TouchableOpacity onPress={onTransfer} style={(styles.cardActionButton, styles.appBarIcon)}>
							<Image source={waveBigger} />
						</TouchableOpacity>
						<TouchableOpacity onPress={onTransfer} style={styles.cardActionButton}>
							<MaterialIcons
								name="settings"
								size={20}
								color={colors.primary}
								style={(styles.cardButtonIcon, styles.appBarIcon)}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</Appbar.Header>

			<SafeAreaView>
				<ScrollView style={styles.homeScroll}>
					<View style={styles.paddingContent}>
						<Card style={styles.card}>
							<View style={styles.cardTopContent}>
								<View>
									<Text style={styles.cardLabel}>Your total assets</Text>
									<Text style={styles.cardBalance}>${commify(state.value.balance?.usd || '')}</Text>
								</View>
								<View>
									<Image source={avatar} style={styles.avatar} />
								</View>
							</View>
							<View style={styles.cardBottomContent}>
								<TouchableOpacity
									onPress={onTransfer}
									style={(styles.cardActionButton, styles.cardDivisor)}
								>
									<MaterialIcons
										name="add-circle-outline"
										size={20}
										color={colors.primary}
										style={styles.cardButtonIcon}
									/>
									<Text>Add funds</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={onTransfer} style={styles.cardActionButton}>
									<MaterialIcons
										name="arrow-circle-up"
										size={20}
										color={colors.primary}
										style={styles.cardButtonIcon}
									/>
									<Text>Send</Text>
								</TouchableOpacity>
							</View>
						</Card>
					</View>

					<SafeAreaView>
						<ScrollView
							style={styles.scrollviewHorizontal}
							horizontal={true}
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
						>
							<View style={styles.scrollviewHorizontalContent}>
								<Card style={styles.cardScroll}>
									<TouchableOpacity onPress={onTransfer} style={styles.cardActionButton}>
										<MaterialIcons
											name="compare-arrows"
											size={20}
											color={colors.primary}
											style={styles.cardButtonIcon}
										/>
										<Text>Exchange</Text>
									</TouchableOpacity>
								</Card>
								<Card style={styles.cardScroll}>
									<TouchableOpacity onPress={onTransfer} style={styles.cardActionButton}>
										<MaterialIcons
											name="arrow-circle-down"
											size={20}
											color={colors.primary}
											style={styles.cardButtonIcon}
										/>
										<Text>Receive</Text>
									</TouchableOpacity>
								</Card>
								<Card style={styles.cardScroll}>
									<TouchableOpacity onPress={onTransfer} style={styles.cardActionButton}>
										<MaterialIcons
											name="content-copy"
											size={20}
											color={colors.primary}
											style={styles.cardButtonIcon}
										/>
										<Text>Copy address</Text>
									</TouchableOpacity>
								</Card>
								<Card style={styles.cardScroll}>
									<TouchableOpacity onPress={onTransfer} style={styles.cardActionButton}>
										<MaterialIcons
											name="add"
											size={20}
											color={colors.primary}
											style={styles.cardButtonIcon}
										/>
										<Text>New wallet</Text>
									</TouchableOpacity>
								</Card>
								<Card style={styles.cardScroll}>
									<TouchableOpacity onPress={onTransfer} style={styles.cardActionButton}>
										<MaterialIcons
											name="person-outline"
											size={20}
											color={colors.primary}
											style={styles.cardButtonIcon}
										/>
										<Text>Switch accounts</Text>
									</TouchableOpacity>
								</Card>
							</View>
						</ScrollView>
					</SafeAreaView>

					<View style={styles.row}>
						<TouchableOpacity
							onPress={() => setSelectedTab('transactions')}
							style={selectedTab === 'transactions' ? styles.tabActive : styles.tabInactive}
						>
							<Text
								style={selectedTab === 'transactions' ? styles.tabTitleActive : styles.tabTitleInactive}
							>
								Transactions
							</Text>
						</TouchableOpacity>
						<Svg
							style={styles.roundInside}
							width={30}
							height={30}
							fill="white"
							strokeWidth={1}
							viewBox={`0 0 ${roundTab}`}
						>
							<Path d={`${roundTabPath}`} />
						</Svg>
						<TouchableOpacity
							onPress={() => setSelectedTab('net_worth')}
							style={selectedTab === 'net_worth' ? styles.tabActive : styles.tabInactive}
						>
							<Text style={selectedTab === 'net_worth' ? styles.tabTitleActive : styles.tabTitleInactive}>
								Net worth
							</Text>
						</TouchableOpacity>
					</View>

					{selectedTab === 'net_worth' ? (
						<View style={styles.tabsNetWorth}>
							<View style={styles.currentValueCard}>
								<Text style={styles.cardLabel}>Current value</Text>
								<Text style={styles.cardBalance}>${commify(state.value.balance?.usd || '')}</Text>
							</View>
							<TouchableOpacity style={styles.netWorthItem}>
								<View style={styles.netWorthIcon}>
									<MaterialIcons name="account-balance-wallet" size={24} />
								</View>
								<View style={styles.netWorthItemText}>
									<Text style={styles.fontSizeDefault}>Wallet</Text>
									<Text style={styles.fontSizeSmall}>Available funds in your wallet</Text>
								</View>
								<View style={styles.row}>
									<Text style={(styles.fontSizeDefault, styles.fontBold)}>$0.00</Text>
									<Text style={(styles.cardLabel, styles.arrowPadding)}>
										<MaterialIcons name="arrow-forward-ios" size={16} />
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.netWorthItem}>
								<View style={styles.netWorthIcon}>
									<MaterialIcons name="move-to-inbox" size={24} />
								</View>
								<View style={styles.netWorthItemText}>
									<Text style={styles.fontSizeDefault}>Deposits</Text>
									<Text style={styles.fontSizeSmall}>Funds deposited in vaults</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.fontSizeDefault}>Deposit</Text>
									<Text style={(styles.cardLabel, styles.arrowPadding)}>
										<MaterialIcons
											name="arrow-forward-ios"
											color={'#5E2522'}
											size={16}
											style={styles.arrowRight}
										/>
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.netWorthItem}>
								<View style={styles.netWorthIconAlert}>
									<MaterialIcons name="volunteer-activism" color={'#5E2522'} size={24} />
								</View>
								<View style={styles.netWorthItemText}>
									<Text style={styles.fontSizeDefault}>Debt</Text>
									<Text style={styles.fontSizeSmall}>Open loans</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.fontSizeDefault}>Borrow</Text>
									<Text style={(styles.cardLabel, styles.arrowPadding)}>
										<MaterialIcons name="arrow-forward-ios" color={'#5E2522'} size={16} />
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.tabsTransactions}>
							<View style={styles.row}>
								<Text style={styles.transactionDateLabel}>Today</Text>
								<Text style={styles.fontSizeSmall}>Day balance: $0.00</Text>
							</View>

							<View style={styles.transactionDayRow}>
								<View style={(styles.row, styles.transactionItem)}>
									<View style={styles.row}>
										<Image source={transationalSent} style={styles.transationalIcon} />
										<View>
											<Text style={styles.fontSizeSmall}>7h30 pm</Text>
											<Text style={styles.fontSizeDefault}>To jreys.eth</Text>
										</View>
									</View>
									<View style={styles.alignContentRight}>
										<Text style={styles.fontSizeSmall}>0.01 ETH</Text>
										<Text style={styles.fontBold}>-$20.00</Text>
									</View>
								</View>
								<View style={styles.row}>
									<View style={styles.row}>
										<Image source={transationalReceive} style={styles.transationalIcon} />
										<View>
											<Text style={styles.fontSizeSmall}>10h00 pm</Text>
											<Text style={styles.fontSizeDefault}>From jreys.eth</Text>
										</View>
									</View>
									<View style={styles.alignContentRight}>
										<Text style={styles.fontSizeSmall}>0.01 ETH</Text>
										<Text style={styles.fontBold}>$20.00</Text>
									</View>
								</View>
							</View>

							<Button style={{ marginBottom: 5 }} mode={'contained'} onPress={onTransfer}>
								Transfer
							</Button>
							<Button style={{ marginBottom: 5 }} color={'red'} onPress={onDeleteWallet}>
								Delete
							</Button>

							<Text style={{ marginBottom: 5 }}>{state.value.wallet?.address}</Text>
							<View
								style={{
									marginBottom: 5,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<Button onPress={onCopyToClipboard}>Copy to Clipboard</Button>
								<Button onPress={onShareAddress}>Share Address</Button>
								<Portal>
									<Dialog visible={dialogVisible.value} onDismiss={() => dialogVisible.set(false)}>
										{/*<Dialog.Title>Aaa</Dialog.Title>*/}
										<Dialog.Content style={{ alignItems: 'center' }}>
											<QRCode value={state.value.wallet?.address} />
										</Dialog.Content>
										<Dialog.Actions>
											{/*<Button onPress={hideDialog}>Done</Button>*/}
										</Dialog.Actions>
									</Dialog>
								</Portal>
							</View>

							<Text>
								Balance ETH:{' '}
								{state.value.balance?.eth ? formatEther(state.value.balance.eth as BigNumberish) : ''}
							</Text>

							<View style={{ padding: 10 }}>
								<Text>Tokens:</Text>
								<Text>
									DAI Balance:{' '}
									{state.value.tokens?.dai?.balance
										? formatUnits(state.value.tokens?.dai?.balance)
										: ''}
								</Text>
							</View>
							{/*        <TextInput label={'Transfer To'} value={transferTo.value.to}
																	onChangeText={address => transferTo.to.set(address)}/>
												<TextInput keyboardType={'number-pad'} label={'Amount'} value={transferTo.amount.value}
																	onChangeText={onAmountChange}/>*/}
						</View>
					)}
				</ScrollView>
			</SafeAreaView>

			<Snackbar onDismiss={() => snackbarVisible.set(false)} visible={snackbarVisible.value}>
				Address Copied
			</Snackbar>
		</View>
	);
}
