import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useState } from '@hookstate/core';
import { Transaction as ITransaction, smallWalletAddress, getENSAddress } from '@src/model/wallet';
import { formatUnits } from 'ethers/lib/utils';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';
import { globalWalletState } from 'old/src/stores/WalletStore';
import { network } from '@src/model/network';
import globalStyles from 'old/src/components/global.styles';
import transationalReceive from './transational-receive.png';
import transationalSent from './transational-sent.png';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		transactionItem: {
			marginBottom: 32,
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		transationalIcon: {
			width: 32,
			height: 32,
			marginRight: 8
		},
		fontSizeSmall: {
			color: colors.secondaryText,
			fontSize: 12
		},
		alignContentRight: {
			alignItems: 'flex-end'
		}
	});

const Transaction = ({ transaction }: { transaction: ITransaction }) => {
	const wallet = useState(globalWalletState());
	const address = wallet.address.value;
	const { from, to, timeStamp, isError, value, tokenSymbol = 'ETH', tokenDecimal = '18', hash } = transaction;
	const received = to.toLowerCase() === address.toLowerCase();
	const source = received ? from : to;
	const timestamp = new Date(+timeStamp * 1000);
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const [formattedSource, setFormattedSource] = React.useState(smallWalletAddress(source));
	const [url, setUrl] = React.useState('');

	useEffect(() => {
		const formatAddress = async () => {
			const ens = await getENSAddress(source);
			if (ens) {
				setFormattedSource(ens);
			}
		};

		const fetchURL = async () => {
			const { etherscanURL } = await network();
			setUrl(`${etherscanURL}tx/${hash}`);
		};

		fetchURL();
		formatAddress();
	}, []);

	return (
		<TouchableOpacity
			style={[globalStyles.row, styles.transactionItem, { opacity: isError === '1' ? 0.3 : 1 }]}
			onPress={() => Linking.openURL(url)}
		>
			<View style={globalStyles.row}>
				<Image source={received ? transationalReceive : transationalSent} style={styles.transationalIcon} />
				<View>
					<Text style={styles.fontSizeSmall}>{format(timestamp, 'MM/dd/yyyy hh:mm aa')}</Text>
					<Text style={globalStyles.fontSizeDefault}>
						{received ? 'From' : 'To'} {formattedSource}
					</Text>
				</View>
			</View>
			<View style={styles.alignContentRight}>
				<Text style={styles.fontSizeSmall}>
					{value ? formatUnits(value, tokenDecimal) : ''} {tokenSymbol}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Transaction;
