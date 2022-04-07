import React from 'react';
import { View, Image } from 'react-native';
import { Text, Token, Button, ActivityIndicator, TokenAmountInput } from '@components';
import { TokenType } from '@styles';
// import { smallWalletAddress } from '@models/wallet';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { decimalSeparator } from 'expo-localization';
import { useKeyboard } from '@hooks';
import { styles } from './TransactionTransfer.styles';
import { TransactionTransferProps } from './TransactionTransfer.types';
import { Card, GasPriceLine } from '../../components';
import { useTransactionTransfer } from './TransactionTransfer.hooks';

const TransactionTransfer: React.FC<TransactionTransferProps> = ({ token, user, ...props }) => {
	const keyboardVisible = useKeyboard();
	const {
		image,
		amount,
		number,
		gasPrice,
		sending,
		onChangeAmount,
		onChangeNumber,
		onSend,
		onMaxPress,
		onTypeChange,
		amountType
	} = useTransactionTransfer({ token, user, ...props });

	return (
		<View style={styles.container}>
			<>
				{!keyboardVisible && (
					<View style={styles.imageContainer}>
						<Token name={token.symbol.toLowerCase() as TokenType} size={64} />
						{image && <Image style={[styles.image, { marginLeft: -20, zIndex: -1 }]} source={image} />}
					</View>
				)}
				<Text type="h3" weight="extraBold" marginBottom={32}>
					How much{' '}
					<Text color="text12" type="h3" weight="extraBold">
						{amountType === 'token' ? token.symbol : 'USD'}
					</Text>{' '}
					do you want to send
					{/* <Text color="text12" type="h3" weight="extraBold">
						{' '}
						{user.name || smallWalletAddress(user.address)}
					</Text> */}
					?
				</Text>
			</>

			<Card token={token} />

			<TokenAmountInput
				amount={amount}
				symbol={token.symbol}
				onAmountChange={onChangeAmount}
				onNumberAmountChange={onChangeNumber}
				visible={!!token}
				isAmountValid={(number || 0) <= (amountType === 'token' ? Number(token.balance) : token.balanceUSD)}
				autoFocus
				placeholder={amountType === 'fiat' ? `$00${decimalSeparator}00` : `0${decimalSeparator}00`}
				onMaxPress={onMaxPress}
				onTypeChange={onTypeChange}
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
					<Button
						title="Send"
						disabled={
							!number || number > (amountType === 'token' ? Number(token.balance) : token.balanceUSD)
						}
						onPress={onSend}
					/>
				)}
			</View>
			<KeyboardSpacer />
		</View>
	);
};

export default TransactionTransfer;
