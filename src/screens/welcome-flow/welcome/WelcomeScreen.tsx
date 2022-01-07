import React, { useCallback } from 'react';
import { Image, Text, View, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from '@hookstate/core';
import PrimaryButton from '@components/PrimaryButton';
import { globalWalletState } from '@stores/WalletStore';
import { RootStackParamList } from '@helpers/param-list-type';
import { walletCreate } from '@models/wallet';
import WelcomeContainer from '../WelcomeContainer';
import MainText from '../MainText';
import SecondaryText from '../SecondaryText';
import styles from './styles';
import image from './welcome.png';
import backgroundTop from './wave-welcome-header.png';
import backgroundTopDark from './wave-welcome-header-dark.png';
import backgroundBottom from './wave-welcome-footer.png';
import backgroundBottomDark from './wave-welcome-footer-dark.png';

export default function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const walletState = useState(globalWalletState());

	const scheme = useColorScheme();

	const onCreateWallet = useCallback(async () => {
		const newWallet = await walletCreate();
		console.log('NJEW WALLET', newWallet);
		walletState.set(newWallet as any);
		navigation.navigate('WalletCreated');
	}, [navigation]);

	return (
		<WelcomeContainer>
			<View style={styles.content}>
				<Image source={image} style={styles.headerImage} />
				<Image source={scheme === 'dark' ? backgroundTopDark : backgroundTop} style={styles.backgroundTop} />
				<MainText>Wave goodbye to your bank!</MainText>
				<SecondaryText>
					Easily save, spend and invest with
					<Text style={styles.textBold}> Minke </Text>
				</SecondaryText>
				<PrimaryButton onPress={onCreateWallet}>Create Wallet</PrimaryButton>
				<PrimaryButton onPress={() => console.log('Import wallet')} mode="text">
					Import wallet
				</PrimaryButton>
			</View>
			<Image
				source={scheme === 'dark' ? backgroundBottomDark : backgroundBottom}
				style={styles.backgroundBottom}
			/>
		</WelcomeContainer>
	);
}
