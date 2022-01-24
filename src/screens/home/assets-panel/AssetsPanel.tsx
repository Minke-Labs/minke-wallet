import React from 'react';
import { View, Image, GestureResponderEvent, useColorScheme } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useState } from '@hookstate/core';
import { commify } from 'ethers/lib/utils';
import { Text, Card, useTheme } from 'react-native-paper';
import TextButton from '@components/TextButton';
import { globalWalletState } from '@stores/WalletStore';
import makeBlockie from 'ethereum-blockies-base64';
import AddFundsButton from '@components/AddFundsButton';
import { makeStyles } from './styles';

const AssetsPanel = ({ onSend }: { onSend: (event: GestureResponderEvent) => void }) => {
	const state = useState(globalWalletState());
	const { colors } = useTheme();
	const styles = makeStyles(colors, useColorScheme());

	if (state.promised) return <AppLoading />;

	const balance = state.value.balance?.usd || '';
	const address = state.value.address || '';
	return (
		<View style={styles.paddingContent}>
			<Card style={styles.card}>
				<View style={styles.cardTopContent}>
					<View>
						<Text style={styles.cardLabel}>Your total assets</Text>
						<Text style={styles.cardBalance}>${commify(balance)}</Text>
					</View>
					<View>
						{address ? <Image source={{ uri: makeBlockie(address) }} style={styles.avatar} /> : null}
					</View>
				</View>
				<View style={styles.cardBottomContent}>
					<AddFundsButton />
					<TextButton
						text="Send"
						icon="arrow-circle-up"
						onPress={onSend}
						containerStyle={{ flexGrow: 1, flexBasis: 0, justifyContent: 'center' }}
					/>
				</View>
			</Card>
		</View>
	);
};

export default AssetsPanel;
