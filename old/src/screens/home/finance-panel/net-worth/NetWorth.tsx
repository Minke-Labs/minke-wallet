import React from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { commify } from 'ethers/lib/utils';
import { useState } from '@hookstate/core';
import { useTheme, Text } from 'react-native-paper';
import { globalWalletState } from '@src/stores/WalletStore';
import globalStyles from 'old/src/components/global.styles';
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
					<Text style={globalStyles.fontSizeDefault}>Wallet</Text>
					<Text style={styles.secondaryText}>Available funds in your wallet</Text>
				</View>
				<View style={globalStyles.row}>
					<Text style={(globalStyles.fontSizeDefault, globalStyles.fontBold)}>
						${commify(state.value.balance?.usd || '')}
					</Text>
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
					<Text style={globalStyles.fontSizeDefault}>Deposits</Text>
					<Text style={styles.secondaryText}>Funds deposited in vaults</Text>
				</View>
				<View style={globalStyles.row}>
					<Text style={globalStyles.fontSizeDefault}>Deposit</Text>
					<View style={(styles.cardLabel, styles.arrowPadding)}>
						<MaterialIcons name="arrow-forward-ios" color={colors.text} size={16} />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={styles.netWorthItem}>
				<View style={styles.netWorthIconAlert}>
					<FontAwesome5 name="hand-holding-usd" style={styles.netWorthIconColor} size={22} />
				</View>
				<View style={styles.netWorthItemText}>
					<Text style={globalStyles.fontSizeDefault}>Debt</Text>
					<Text style={styles.secondaryText}>Open loans</Text>
				</View>
				<View style={globalStyles.row}>
					<Text style={globalStyles.fontSizeDefault}>Borrow</Text>
					<View style={(styles.cardLabel, styles.arrowPadding)}>
						<MaterialIcons name="arrow-forward-ios" color={colors.text} size={16} />
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default NetWorth;
