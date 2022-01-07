import React from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { commify } from 'ethers/lib/utils';
import { useState } from '@hookstate/core';
import { useTheme, Text } from 'react-native-paper';
import { globalWalletState } from '@stores/WalletStore';
import { makeStyles } from './styles';

const NetWorth = () => {
	const state = useState(globalWalletState());
	const { colors } = useTheme();
	const styles = makeStyles(colors, useColorScheme());
	return (
		<View style={styles.tabsNetWorth}>
			<View style={styles.currentValueCard}>
				<Text style={styles.cardLabel}>Current value</Text>
				<Text style={styles.cardBalance}>${commify(state.value.balance?.usd || '')}</Text>
			</View>
			<TouchableOpacity style={styles.netWorthItem}>
				<View style={styles.netWorthIcon}>
					<MaterialIcons name="account-balance-wallet" size={24} color={colors.text} />
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
					<MaterialCommunityIcons name="safe" size={24} color={colors.text} />
				</View>
				<View style={styles.netWorthItemText}>
					<Text style={styles.fontSizeDefault}>Deposits</Text>
					<Text style={styles.fontSizeSmall}>Funds deposited in vaults</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.fontSizeDefault}>Deposit</Text>
					<View style={(styles.cardLabel, styles.arrowPadding)}>
						<MaterialIcons name="arrow-forward-ios" color={colors.text} size={16} />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={styles.netWorthItem}>
				<View style={styles.netWorthIconAlert}>
					<FontAwesome5 name="hand-holding-usd" style={styles.netWorthIconColor} size={24} />
				</View>
				<View style={styles.netWorthItemText}>
					<Text style={styles.fontSizeDefault}>Debt</Text>
					<Text style={styles.fontSizeSmall}>Open loans</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.fontSizeDefault}>Borrow</Text>
					<View style={(styles.cardLabel, styles.arrowPadding)}>
						<MaterialIcons name="arrow-forward-ios" color={colors.text} size={16} />
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default NetWorth;
