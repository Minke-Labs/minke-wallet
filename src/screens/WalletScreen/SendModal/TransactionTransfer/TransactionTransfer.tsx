/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, Token, Button } from '@components';
import { useState } from '@hookstate/core';
import { TokenType } from '@styles';
import { globalWalletState } from '@src/stores/WalletStore';
import {
	estimateGas,
	sendTransaction,
	EstimateGasResponse,
	WalletToken,
	resolveENSAddress,
	imageSource
} from '@src/model/wallet';
import { numberFormat } from '@helpers/utilities';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TokenAmountInput from '@src/components/TokenAmountInput/TokenAmountInput';
import { styles } from './TransactionTransfer.styles';
import Card from '../Card';

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
	token: WalletToken;
}

const GasPriceLine: React.FC<GasPriceLineProps> = ({ gas, label, priceUSD, token }) => {
	const coinValue = gas * 21000 * 10 ** -9;
	return (
		<Text color="text2" type="span" marginBottom={8}>
			{label}: Normal - {coinValue.toFixed(5)} {token.symbol} | $
			{numberFormat(coinValue * priceUSD, 5)} Network Fee
		</Text>
	);
};

const TransactionTransfer: React.FC<TransactionTransferProps> = ({ user, token, onDismiss, sentSuccessfully }) => {
	const state = useState(globalWalletState());
	const [image, setImage] = React.useState<{ uri: string }>();
	const [amount, onChangeAmount] = React.useState('');
	const [number, onChangeNumber] = React.useState<Number>();
	const [gasPrice, setGasPrice] = React.useState<EstimateGasResponse>();

	useEffect(() => {
		const fetchGasPrice = async () => {
			const result = await estimateGas();
			setGasPrice(result);
		};
		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};

		fetchGasPrice();
		fetchImage();
	}, []);

	const { privateKey, network: { id, nativeToken } } = state.value;

	const onSend = async () => {
		if (gasPrice) {
			const ens = user.address;
			const to = (await resolveENSAddress(ens)) || ens;
			const result = await sendTransaction(
				privateKey,
				to,
				amount,
				gasPrice.result.ProposeGasPrice,
				id,
				token.symbol.toLowerCase() === nativeToken.symbol.toLowerCase() ? '' : token.address
			);

			onDismiss();
			sentSuccessfully({
				symbol: token.symbol.toLowerCase(),
				link: result.hash
			});
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Token name={token.symbol.toLowerCase() as TokenType} size={64} />
				{image &&
					<Image
						style={[styles.image, { marginLeft: -20, zIndex: -1 }]}
						source={image}
					/>}
			</View>

			<Text type="h3" weight="extraBold" marginBottom={32}>
				How much <Text color="text11" type="h3" weight="extraBold">{token.symbol}</Text> do you want to send to
				<Text color="text11" type="h3" weight="extraBold"> {user.name}</Text>?
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
						token={token}
						label="Low"
						gas={+gasPrice.result.SafeGasPrice}
						priceUSD={+gasPrice.result.UsdPrice!}
					/>
					<GasPriceLine
						token={token}
						label="Normal"
						gas={+gasPrice.result.ProposeGasPrice}
						priceUSD={+gasPrice.result.UsdPrice!}
					/>
					<GasPriceLine
						token={token}
						label="Fast"
						gas={+gasPrice.result.FastGasPrice}
						priceUSD={+gasPrice.result.UsdPrice!}
					/>
				</View>
			)}

			<Button
				title="Send"
				disabled={!number || number > token.balance}
				onPress={onSend}
			/>
			<KeyboardSpacer />
		</View>
	);
};

export default TransactionTransfer;
