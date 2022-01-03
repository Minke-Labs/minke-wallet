import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from '@hookstate/core';
import { RootStackParamList } from '../helpers/param-list-type';
import { walletCreate } from '../model/wallet';
import { globalWalletState } from '../stores/WalletStore';
import Container from '../components/Container';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	logo: {
		backgroundColor: '#214365',
		width: 268,
		height: 268,
		borderRadius: Dimensions.get('window').width * 0.5
	},
	button: {
		alignSelf: 'stretch',
		marginHorizontal: 20,
		backgroundColor: '#34769D',
		borderRadius: 20,
		// height: 20,
		padding: 20
	}
});
// const onCreateWallet = useCallback(async () => {
//     const operation = dangerouslyGetState().index === 1 ? navigate : replace;
//     operation(Routes.SWIPE_LAYOUT, {
//       params: { emptyWallet: true },
//       screen: Routes.WALLET_SCREEN,
//     });
//   }, [dangerouslyGetState, navigate, replace]);

export default function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	// console.log(walletState.promised, walletState.value?.wallet, 'asdasdasdasd')
	const walletState = useState(globalWalletState());

	const onCreateWallet = useCallback(async () => {
		const newWallet = await walletCreate();
		console.log('NJEW WALLET', newWallet);
		walletState.set(newWallet as any);
		navigation.navigate('Backup');
	}, [navigation]);
	return (
		<Container>
			<View style={styles.logo} />
			<Text
				style={{
					fontSize: 36,
					fontFamily: 'Inter_700Bold',
					textAlign: 'center'
					// fontWeight: "bold"
				}}
			>
				Wave goodbye to your bank 👋
			</Text>
			<Text style={{ fontSize: 17 }}>Easily save, spend and invest with Minke</Text>
			<TouchableOpacity style={styles.button} onPress={onCreateWallet}>
				<Text
					style={{
						color: '#fff',
						fontSize: 17,
						textAlign: 'center'
					}}
				>
					Create Wallet
				</Text>
			</TouchableOpacity>
		</Container>
	);
}
