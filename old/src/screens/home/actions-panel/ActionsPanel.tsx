import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, GestureResponderEvent } from 'react-native';
import { Portal, Snackbar, Text } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import RoundButton from 'old/src/components/RoundButton';
import ReceiveModal from 'old/src/components/ReceiveModal';
import { globalWalletState } from '@src/stores/WalletStore';

const styles = StyleSheet.create({
	scrollviewHorizontal: {
		paddingLeft: 24,
		marginBottom: 32,
		paddingBottom: 8
	},
	scrollviewHorizontalContent: {
		flexDirection: 'row',
		paddingRight: 32
	},
	roundButton: { marginRight: 16 }
});

const ActionsPanel = ({
	onCreateWallet,
	onDeleteWallet,
	onExchange,
	onSwitchAccounts
}: {
	onCreateWallet: (event: GestureResponderEvent) => void;
	onDeleteWallet: (event: GestureResponderEvent) => void;
	onExchange: (event: GestureResponderEvent) => void;
	onSwitchAccounts: (event: GestureResponderEvent) => void;
}) => {
	const [receiveVisible, setReceiveVisible] = useState(false);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const showReceive = () => setReceiveVisible(true);
	const hideReceive = () => setReceiveVisible(false);
	const wallet = globalWalletState();

	const onCopyToClipboard = () => {
		Clipboard.setString(wallet.value.address || '');
		setSnackbarVisible(true);
	};

	return (
		<SafeAreaView>
			<ScrollView
				style={styles.scrollviewHorizontal}
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.scrollviewHorizontalContent}>
					<View style={styles.roundButton}>
						<RoundButton text="Exchange" icon="compare-arrows" onPress={onExchange} />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="Receive" icon="arrow-circle-down" onPress={showReceive} />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="Copy address" icon="content-copy" onPress={onCopyToClipboard} />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="New wallet" icon="add" onPress={onCreateWallet} />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="Switch accounts" icon="person-outline" onPress={onSwitchAccounts} />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="Delete wallet" icon="delete-outline" onPress={onDeleteWallet} />
					</View>
				</View>
				<ReceiveModal visible={receiveVisible} onDismiss={hideReceive} onCloseAll={hideReceive} />
				<Portal>
					<Snackbar onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
						<Text style={{ color: '#FFFFFF' }}>Address copied!</Text>
					</Snackbar>
				</Portal>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ActionsPanel;
