/* eslint-disable no-console */
import React, { useState } from 'react';
import { Image, Linking, TouchableOpacity, useColorScheme, View, SafeAreaView } from 'react-native';
import { Icon, Text, Button, TransparentCard } from '@components';
import { LinearGradient } from 'expo-linear-gradient';
import { approvalTransaction } from '@models/deposit';
import { aaveGhost } from '@images';
import { useNavigation } from '@hooks';
import { globalDepositState } from '@src/stores/DepositStore';
import { globalWalletState } from '@src/stores/WalletStore';
import { getProvider } from '@src/model/wallet';
import { Wallet } from 'ethers';
import styles from './OpenAave.styles';

const lightColors = ['rgba(223, 191, 206, 1)', 'rgba(143, 204, 208, 1)'];
const darkColors = ['rgba(64, 63, 98, 1)', 'rgba(48, 131, 151, 1)'];

const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	const colors = scheme === 'dark' ? darkColors : lightColors;
	return (
		<View style={{ flex: 1, backgroundColor: scheme === 'dark' ? '#4540687d' : '#F5F5F5' }}>
			<LinearGradient colors={colors} style={{ flex: 1 }} start={{ x: 0.7, y: 0 }} />
			<Image source={aaveGhost} style={styles.aaveGhost} />
			{children}
		</View>
	);
};

const OpenAave = ({ onApprove }: { onApprove: () => void }) => {
	const navigation = useNavigation();
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
		<Background>
			<View style={styles.container}>
				<SafeAreaView>
					<View style={styles.headerNavigation}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Icon name="arrowBackStroke" color="text7" size={24} />
						</TouchableOpacity>
					</View>

					<Text type="h3" weight="bold" color="text1" marginBottom={35}>
						Open Aave {'\n'}Savings Account
					</Text>

					<TransparentCard marginBottom={8}>
						<Text weight="extraBold" marginBottom={12} style={{ width: '100%' }}>
							What is Aave
						</Text>
						<Text type="a">
							Aave lets you earn interest on your crypto and stablecoins by lending it to borrowers. Aave
							is a decentralized protocol for lending and borrowing crypto. Rates are variable and can
							change at any time. {'\n\n'}
							Risks include the economics of the protocol, market risks, security of the smart contracts,
							counterparty risk and more. Aave has been audited by Trail of Bits and Open Zeppelin.
						</Text>
					</TransparentCard>

					<View style={styles.actionContainer}>
						<TouchableOpacity onPress={() => Linking.openURL('https://aave.com/')}>
							<TransparentCard row padding={16}>
								<Icon name="siteStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
								<Text type="a" color="text2">
									View Site
								</Text>
								<Icon name="chevronRight" color="cta1" size={24} />
							</TransparentCard>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => Linking.openURL('https://docs.aave.com/faq/')}>
							<TransparentCard row padding={16}>
								<Icon name="learnStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
								<Text type="a" color="text2">
									Learn More
								</Text>
								<Icon name="chevronRight" color="cta1" size={24} />
							</TransparentCard>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
				<View style={{ bottom: 34 }}>
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
		</Background>
	);
};

export default OpenAave;
