import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Portal, Snackbar, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { globalWalletState } from '@stores/WalletStore';
import * as Clipboard from 'expo-clipboard';
import Modal from '@components/Modal';
import RoundButton from '@components/RoundButton';
import ApplePayButton from '@components/ApplePayButton';
import { ICoin } from '@helpers/coins';
import { makeStyles } from './styles';

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
							<Text
								style={[
									styles.modalAmountSelectButtonText,
									amount === value ? styles.activeAmountButtonText : {}
								]}
							>
								${value}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<RoundButton text="Choose another amount" onPress={enableCustomAmount} />
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
