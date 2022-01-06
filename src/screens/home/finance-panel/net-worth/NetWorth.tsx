import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { commify } from 'ethers/lib/utils';
import { useState } from '@hookstate/core';
import { globalWalletState } from '../../../../stores/WalletStore';
import styles from './styles';

const NetWorth = () => {
	const state = useState(globalWalletState());
	return (
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
					<Text style={(styles.fontSizeDefault, styles.fontBold)}>$00.00</Text>
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
						<MaterialIcons name="arrow-forward-ios" color="#5E2522" size={16} />
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={styles.netWorthItem}>
				<View style={styles.netWorthIconAlert}>
					<MaterialIcons name="volunteer-activism" color="#5E2522" size={24} />
				</View>
				<View style={styles.netWorthItemText}>
					<Text style={styles.fontSizeDefault}>Debt</Text>
					<Text style={styles.fontSizeSmall}>Open loans</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.fontSizeDefault}>Borrow</Text>
					<Text style={(styles.cardLabel, styles.arrowPadding)}>
						<MaterialIcons name="arrow-forward-ios" color="#5E2522" size={16} />
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default NetWorth;
