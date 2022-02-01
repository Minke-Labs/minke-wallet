import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import PrimaryButton from '@src/components/PrimaryButton';
import { WalletToken } from '@src/model/wallet';
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
	const [amount, onChangeAmount] = useState('');
	const [number, onChangeNumber] = useState<Number>();

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

			<PrimaryButton disabled={!number || number > token.balance}>Send</PrimaryButton>

			<KeyboardSpacer />
		</View>
	);
};

export default TransactionTransfer;
