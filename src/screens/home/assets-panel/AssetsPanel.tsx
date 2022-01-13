import React, {useEffect} from 'react';
import { View, Image, useColorScheme } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useState } from '@hookstate/core';
import { commify } from 'ethers/lib/utils';
import { Text, Card, useTheme } from 'react-native-paper';
import TextButton from '@components/TextButton';
import { globalWalletState } from '@stores/WalletStore';
import makeBlockie from 'ethereum-blockies-base64';
import { makeStyles } from './styles';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@helpers/param-list-type";

const AssetsPanel = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const state = useState(globalWalletState());
	const { colors } = useTheme();
	const styles = makeStyles(colors, useColorScheme());


	if (state.promised) return <AppLoading />;

	const balance = state.value.balance?.usd || '';
	console.log(state.value.address)
	return (
		<View style={styles.paddingContent}>
			<Card style={styles.card}>
				<View style={styles.cardTopContent}>
					<View>
						<Text style={styles.cardLabel}>Your total assets</Text>
						<Text style={styles.cardBalance}>${commify(balance)}</Text>
					</View>
					<View>
						<Image source={{ uri: makeBlockie(state.value.address) }} style={styles.avatar} />
					</View>
				</View>
				<View style={styles.cardBottomContent}>
					<TextButton
						text="Add funds"
						icon="add-circle-outline"
						containerStyle={[styles.cardDivisor, { borderRightColor: colors.background }]}
					/>
					<TextButton
						text="Send"
						icon="arrow-circle-up"
						onPress={() => navigation.navigate('TransactionSelectFunds')}
						containerStyle={{ flexGrow: 1, flexBasis: 0, justifyContent: 'center' }}
					/>
				</View>
			</Card>
		</View>
	);
};

export default AssetsPanel;
