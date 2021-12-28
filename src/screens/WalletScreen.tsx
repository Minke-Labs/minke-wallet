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
import { isNaN } from 'lodash';
import { commify, formatEther, formatUnits } from 'ethers/lib/utils';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './home/styles';
import avatar from './home/avatar-test.png';

export function WalletScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const state = useState(globalWalletState());
	const snackbarVisible = useState(false);
	const dialogVisible = useState(false);
	const { colors } = useTheme();

	const transferTo = useState({ to: '', amount: '' });
	if (state.promised) return <AppLoading />;

	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		state.set({ wallet: null, walletId: null });
		navigation.navigate('Welcome');
	}, [navigation]);

	const onAmountChange = (text: string) => {
		if (!isNaN(text)) transferTo.amount.set(text);
	};

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

	return (
		<View style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title="Minke Wallet" />
			</Appbar.Header>

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
						<TouchableOpacity onPress={onTransfer} style={(styles.cardActionButton, styles.cardDivisor)}>
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

			<View style={styles.paddingContent}>
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
							<Dialog.Actions>{/*<Button onPress={hideDialog}>Done</Button>*/}</Dialog.Actions>
						</Dialog>
					</Portal>
				</View>

				<Text>
					Balance ETH: {state.value.balance?.eth ? formatEther(state.value.balance.eth as BigNumberish) : ''}
				</Text>

				<View style={{ padding: 10 }}>
					<Text>Tokens:</Text>
					<Text>
						DAI Balance:{' '}
						{state.value.tokens?.dai?.balance ? formatUnits(state.value.tokens?.dai?.balance) : ''}
					</Text>
				</View>
				{/*        <TextInput label={'Transfer To'} value={transferTo.value.to}
																onChangeText={address => transferTo.to.set(address)}/>
											<TextInput keyboardType={'number-pad'} label={'Amount'} value={transferTo.amount.value}
																onChangeText={onAmountChange}/>*/}
			</View>

			<Snackbar onDismiss={() => snackbarVisible.set(false)} visible={snackbarVisible.value}>
				Address Copied
			</Snackbar>
		</View>
	);
}
