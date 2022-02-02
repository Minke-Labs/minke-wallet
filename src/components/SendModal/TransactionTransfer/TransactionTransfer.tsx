import React, { useCallback, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useState } from '@hookstate/core';
import PrimaryButton from '@src/components/PrimaryButton';
import { globalWalletState } from '@src/stores/WalletStore';
import { estimateGas, sendTransaction, EstimateGasResponse, WalletToken, resolveENSAddress } from '@src/model/wallet';
import makeBlockie from 'ethereum-blockies-base64';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TokenAmountInput from '@src/components/TokenAmountInput/TokenAmountInput';
import { styles } from './TransactionTransfer.styles';

interface UserProps {
	name: string;
	address: string;
}

interface TransactionTransferProps {
	user: UserProps;
	token: WalletToken;
}

const Card = ({ token: { symbol, balanceUSD, balance } }: { token: WalletToken }) => (
	<View style={styles.cardContainer}>
		<Image style={styles.cardImage} source={require('@assets/eth.png')} />
		<View style={{ flex: 1 }}>
			<Text style={styles.cardTitle}>{symbol}</Text>
			<Text style={styles.cardDesc}>
				${balanceUSD.toString().match(/^-?\d+(?:\.\d{0,2})?/)} ({balance} {symbol}) available
			</Text>
		</View>
	</View>
);

const TransactionTransfer: React.FC<TransactionTransferProps> = ({ user, token }) => {
	const state = useState(globalWalletState());
	const [amount, onChangeAmount] = React.useState('');
	const [number, onChangeNumber] = React.useState<Number>();
	const [gasPrice, setGasPrice] = React.useState<EstimateGasResponse>();

	useEffect(() => {
		const fetchGasPrice = async () => {
			const result = await estimateGas();
			setGasPrice(result);
		};
		fetchGasPrice();
	}, []);

	const GasPriceLine = useCallback(
		({ gas, label, priceUSD }) => {
			const coinValue = gas * 21000 * 10 ** -9;
			return (
				<Text>
					{label}: Normal - {coinValue} {token.symbol} | $
					{(coinValue * priceUSD).toString().match(/^-?\d+(?:\.\d{0,6})?/)} Network Fee
				</Text>
			);
		},
		[token]
	);

	const {
		privateKey,
		network: { id, defaultToken }
	} = state.value;

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
				token.symbol.toLowerCase() === defaultToken.toLowerCase() ? '' : token.address
			);

			console.log(result);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require('@assets/eth.png')} />
				<Image
					style={[styles.image, { marginLeft: -20, zIndex: -1 }]}
					source={{ uri: makeBlockie(user.address) }}
				/>
			</View>

			<Text style={styles.title}>
				How much <Text style={styles.titleHighlight}>{token.symbol}</Text> do you want to send to{' '}
				<Text style={styles.titleHighlight}>{user.name}</Text>?
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
				<GasPriceLine label="Low" gas={+gasPrice.result.SafeGasPrice} priceUSD={+gasPrice.result.UsdPrice} />
			)}
			{gasPrice && (
				<GasPriceLine
					label="Normal"
					gas={+gasPrice.result.ProposeGasPrice}
					priceUSD={+gasPrice.result.UsdPrice}
				/>
			)}
			{gasPrice && (
				<GasPriceLine label="Fast" gas={+gasPrice.result.FastGasPrice} priceUSD={+gasPrice.result.UsdPrice} />
			)}
			<PrimaryButton disabled={!number || number > token.balance} onPress={onSend}>
				Send
			</PrimaryButton>
			<KeyboardSpacer />
		</View>
	);
};

export default TransactionTransfer;
