import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, Token, Button } from '@components';
import { useState } from '@hookstate/core';
import { TokenType } from '@styles';
import { globalWalletState } from '@src/stores/WalletStore';
import { network } from '@models/network';
import {
	estimateGas,
	sendTransaction,
	EstimateGasResponse,
	WalletToken,
	resolveENSAddress,
	imageSource,
	smallWalletAddress
} from '@models/wallet';
import { numberFormat } from '@helpers/utilities';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TokenAmountInput from '@src/components/TokenAmountInput/TokenAmountInput';
import { styles } from './TransactionTransfer.styles';
import Card from '../Card';
import { ActivityIndicator } from 'react-native-paper';

interface UserProps {
	name: string;
	address: string;
}

type ResultProps = {
	link: string;
	symbol: string;
};

interface TransactionTransferProps {
	user: UserProps;
	token: WalletToken;
	onDismiss: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
}

interface GasPriceLineProps {
	gas: number;
	label: string;
	priceUSD: number;
}

const GasPriceLine: React.FC<GasPriceLineProps> = ({ gas, label, priceUSD }) => {
	const coinValue = gas * 41000 * 10 ** -9;
	return (
		<View style={{ marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
			<Text color="text2" type="span">
				Speed: {label}
			</Text>
			<Text color="text2" type="span">
				{numberFormat(coinValue * priceUSD, 5)} Network Fee
			</Text>
		</View>
	);
};

const TransactionTransfer: React.FC<TransactionTransferProps> = ({ user, token, onDismiss, sentSuccessfully }) => {
	const state = useState(globalWalletState());
	const [image, setImage] = React.useState<{ uri: string }>();
	const [amount, onChangeAmount] = React.useState('');
	const [number, onChangeNumber] = React.useState<Number>();
	const [chainDefaultToken, setChainDefaultToken] = React.useState('');
	const [sending, setSending] = React.useState(false);
	const [gasPrice, setGasPrice] = React.useState<EstimateGasResponse>();

	useEffect(() => {
		const fetchGasPrice = async () => {
			const result = await estimateGas();
			setGasPrice(result);
			const {
				nativeToken: { symbol }
			} = await network();
			setChainDefaultToken(symbol);
		};

		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};

		fetchImage();
		fetchGasPrice();
	}, []);

	const {
		privateKey,
		network: { id }
	} = state.value;

	const onSend = async () => {
		if (gasPrice && chainDefaultToken) {
			setSending(true);
			const ens = user.address;
			const to = (await resolveENSAddress(ens)) || ens;
			const { wait, hash } = await sendTransaction(
				privateKey,
				to,
				amount,
				gasPrice.result.ProposeGasPrice,
				id,
				token.symbol.toLowerCase() === chainDefaultToken.toLowerCase() ? '' : token.address
			);
			console.log(hash);
			await wait();
			onDismiss();
			sentSuccessfully({
				symbol: token.symbol.toLowerCase(),
				link: hash
			});
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Token name={token.symbol.toLowerCase() as TokenType} size={64} />
				{image && <Image style={[styles.image, { marginLeft: -20, zIndex: -1 }]} source={image} />}
			</View>
			<Text type="h3" weight="extraBold" marginBottom={32}>
				How much{' '}
				<Text color="text11" type="h3" weight="extraBold">
					{token.symbol}
				</Text>{' '}
				do you want to send to
				<Text color="text11" type="h3" weight="extraBold">
					{' '}
					{smallWalletAddress(user.address)}
				</Text>
				?
			</Text>

			<Card token={token} />

			<TokenAmountInput
				amount={amount}
				onAmountChange={onChangeAmount}
				onNumberAmountChange={onChangeNumber}
				visible={!!token}
				isAmountValid={(number || 0) <= token.balance}
				autoFocus
				style={styles.input}
				placeholder="00.00"
			/>
			{gasPrice && (
				<View style={{ marginBottom: 32 }}>
					<GasPriceLine
						label="Normal"
						gas={+gasPrice.result.ProposeGasPrice}
						priceUSD={+gasPrice.result.UsdPrice!}
					/>
				</View>
			)}
			<View style={{ marginBottom: 8 }}>
				{sending ? (
					<ActivityIndicator />
				) : (
					<Button title="Send" disabled={!number || number > token.balance} onPress={onSend} />
				)}
			</View>
			<KeyboardSpacer />
		</View>
	);
};

export default TransactionTransfer;
