import React, { useCallback } from 'react';
import { Image, Text } from "react-native";
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { walletCreate } from "../../../model/wallet";
import { globalWalletState } from "../../../stores/WalletStore";
import WelcomeContainer from "../WelcomeContainer";
import MainText from "../MainText"
import SecondaryText from "../SecondaryText"
import PrimaryButton from "../../../components/PrimaryButton"
import { useState } from "@hookstate/core";
import { Wallet } from "ethers";
import styles from "./styles";
import image from "./welcome.png"

export default function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const walletState = useState(globalWalletState());

	const onCreateWallet = useCallback(async () => {
		const newWallet = await walletCreate();
		console.log('NJEW WALLET', newWallet)
		walletState.set(newWallet as any)
		navigation.navigate('WalletCreated');
	}, [navigation]);

	return (
		<WelcomeContainer>
			<Image source={image} style={styles.headerImage} />
			<MainText>Wave goodbye to your bank!</MainText>
			<SecondaryText>
				Easily save, spend and invest with
				<Text style={styles.textBold}> Minke </Text>
			</SecondaryText>
			<PrimaryButton onPress={onCreateWallet}>
				Create Wallet
			</PrimaryButton>
			<PrimaryButton onPress={() => console.log("Import wallet")} mode="text">
				Import wallet
			</PrimaryButton>
		</WelcomeContainer>
	)
}
