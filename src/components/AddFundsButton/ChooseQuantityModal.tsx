import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Portal, Snackbar, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { globalWalletState } from '@stores/WalletStore';
import * as Clipboard from 'expo-clipboard';
import Modal from '@components/Modal';
import RoundButton from '@components/RoundButton';
import ApplePayButton from '@components/ApplePayButton';
import { ICoin } from '@helpers/coins';

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		modalCoinDetails: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 16
		},
		modalCoinDetailsCoinName: {
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold',
			marginLeft: 16
		},
		currencyInput: {
			borderBottomColor: '#000000',
			borderBottomWidth: 1,
			paddingBottom: 8,
			fontSize: 32,
			marginTop: 16,
			marginBottom: 24
		},
		modalSubHeadline: {
			marginBottom: 24,
			fontSize: 18,
			fontFamily: 'Inter_500Medium'
		},
		fontBold: {
			fontFamily: 'Inter_800ExtraBold'
		},
		modalAmountContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 24
		},
		modalAmountSelectButton: {
			backgroundColor: colors.fill,
			alignItems: 'center',
			padding: 16,
			paddingRight: 24,
			paddingLeft: 24,
			borderRadius: 16
		},
		addDepositContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: 32,
			marginBottom: 32
		},
		addDeposit: {
			width: 'auto',
			padding: 8,
			borderRadius: 50,
			marginRight: 16,
			backgroundColor: colors.fill
		},
		addDepositText: {
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold'
		},
		addDepositInfo: {
			fontSize: 16,
			marginBottom: 16
		},
		activeAmountButton: {
			backgroundColor: colors.background,
			borderColor: colors.fill,
			borderWidth: 2
		}
	});

const ChooseQuantityModal = ({
	visible,
	onDismiss,
	onCloseAll,
	onBack,
	coin,
	amount,
	setPresetAmount,
	enableCustomAmount
}: {
	visible: boolean;
	onDismiss: () => void;
	onCloseAll: () => void;
	onBack: () => void;
	coin: ICoin;
	amount: number | undefined;
	setPresetAmount: Function;
	enableCustomAmount: () => void;
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const wallet = globalWalletState();

	const onCopyToClipboard = () => {
		Clipboard.setString(wallet.value.wallet?.address || '');
		setSnackbarVisible(true);
	};
	return (
		<Modal visible={visible} onDismiss={onDismiss} onCloseAll={onCloseAll} onBack={onBack}>
			<>
				<View style={styles.modalCoinDetails}>
					<Image source={coin.image} />
					<Text style={styles.modalCoinDetailsCoinName}>{coin.name}</Text>
				</View>

				<Text style={styles.modalSubHeadline}>
					Buy some
					{` ${coin.symbol} `}
					with <Text style={styles.fontBold}>Apple Pay</Text> to start using Minke:
				</Text>

				<View style={styles.modalAmountContainer}>
					{[100, 200, 300].map((value) => (
						<TouchableOpacity
							key={value}
							onPress={() => setPresetAmount(value)}
							style={[styles.modalAmountSelectButton, amount === value ? styles.activeAmountButton : {}]}
						>
							<Text style={{ fontSize: 24 }}>${value}</Text>
						</TouchableOpacity>
					))}
				</View>

				<RoundButton text="Choose another amount" icon="" onPress={enableCustomAmount} />
				<ApplePayButton />

				<View style={styles.addDepositContainer}>
					<View style={styles.addDeposit}>
						<MaterialIcons name="add-circle-outline" size={20} color={colors.primary} />
					</View>
					<Text style={styles.addDepositText}>or deposit</Text>
				</View>
				<Text style={styles.addDepositInfo}>
					Send from <Text style={styles.fontBold}>coinbase</Text> or another exchange
				</Text>
				<RoundButton text="Copy address" icon="content-copy" onPress={onCopyToClipboard} />
				<Portal>
					<Snackbar onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible} duration={3000}>
						<Text style={{ color: '#FFFFFF' }}>Address copied!</Text>
					</Snackbar>
				</Portal>
			</>
		</Modal>
	);
};

export default ChooseQuantityModal;
