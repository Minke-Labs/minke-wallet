import React, { useState } from 'react';
import { ImageBackground, Linking, TouchableOpacity, View } from 'react-native';
import { Icon, Text, Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { approvalTransaction } from '@models/deposit';
import { aaveGhost } from '@images';
import { globalDepositState } from '@src/stores/DepositStore';
import { globalWalletState } from '@src/stores/WalletStore';
import { getProvider } from '@src/model/wallet';
import { Wallet } from 'ethers';
import styles from './OpenAave.styles';

const OpenAave = ({ onApprove }: { onApprove: () => void }) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [loading, setLoading] = useState(false);
	const { address, privateKey } = globalWalletState().value;
	const {
		market: { tokens }
	} = globalDepositState().value;

	const onOpenAccount = async () => {
		setLoading(true);
		const transaction = await approvalTransaction(address, tokens[0].address);
		const { data, from, to, maxFeePerGas, maxPriorityFeePerGas } = transaction;
		const provider = await getProvider();
		const wallet = new Wallet(privateKey, provider);
		const chainId = await wallet.getChainId();
		const nonce = await provider.getTransactionCount(address, 'latest');
		console.log('Approval API', transaction);
		const txDefaults = {
			from,
			to,
			data,
			nonce,
			maxFeePerGas,
			maxPriorityFeePerGas,
			type: 2,
			gasLimit: 100000,
			chainId
		};

		console.log('Approval', txDefaults);

		const signedTx = await wallet.signTransaction(txDefaults);
		const { hash, wait } = await provider.sendTransaction(signedTx as string);
		if (hash) {
			await wait();
			setLoading(false);
			onApprove();
		} else {
			console.error('Error approving');
			setLoading(false);
		}
	};

	return (
		<LinearGradient
			colors={[
				'rgba(223, 191, 206, 1)',
				'rgba(205, 159, 192, 1)',
				'rgba(185, 197, 207, 1)',
				'rgba(143, 204, 208, 1)'
			]}
			style={styles.linearGradient}
		>
			<ImageBackground source={aaveGhost} style={styles.aaveGhost} />
			<View style={styles.container}>
				<View style={styles.headerNavegation}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon name="chevronLeft" color="cta1" size={24} />
					</TouchableOpacity>
				</View>
				<View style={styles.header}>
					<Text type="h3" weight="bold" color="text1">
						Open Aave Savings Account
					</Text>
				</View>

				<View style={[styles.transparentCard, styles.whatsAave]}>
					<Text type="p" weight="bold" color="text1" marginBottom={24}>
						What is Aave
					</Text>
					<Text type="a" color="text1" marginBottom={16}>
						Aave lets you earn interest on your crypto and stablecoins by lending it to borrowers. Aave is a
						decentralized protocol for lending and borrowing crypto. Rates are variable and can change at
						any time.
					</Text>
					<Text type="a" color="text1">
						Risks include the economics of the protocol, market risks, security of the smart contracts,
						counterparty risk and more. Aave has been audited by Trail of Bits and Open Zeppelin.
					</Text>
				</View>

				<View style={styles.actionContainer}>
					<TouchableOpacity
						style={[styles.transparentCard, styles.actionOpenAave]}
						onPress={() => Linking.openURL('https://aave.com/')}
					>
						<Icon name="siteStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
						<Text type="a" color="text2">
							View Site
						</Text>
						<Icon name="chevronRight" color="cta1" size={24} />
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.transparentCard, styles.actionOpenAave]}
						onPress={() => Linking.openURL('https://docs.aave.com/faq/')}
					>
						<Icon name="learnStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
						<Text type="a" color="text2">
							Learn More
						</Text>
						<Icon name="chevronRight" color="cta1" size={24} />
					</TouchableOpacity>
				</View>

				<View style={{ marginTop: 'auto', marginBottom: 12 }}>
					<Button
						iconRight="arrowRight"
						title={loading ? 'Opening your account' : 'Open account'}
						marginBottom={16}
						onPress={onOpenAccount}
						disabled={loading}
					/>
					<Text type="span" color="text2" style={{ textAlign: 'center' }}>
						This transaction will cost a few cents.
					</Text>
				</View>
			</View>
		</LinearGradient>
	);
};

export default OpenAave;
