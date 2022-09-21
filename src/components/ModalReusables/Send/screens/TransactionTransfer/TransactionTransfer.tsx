import React from 'react';
import { View, Image } from 'react-native';
import Text from '@src/components/Text/Text';
import Token from '@src/components/Token/Token';
import Warning from '@src/components/Warning/Warning';
import NetworkWarning from '@src/components/NetworkWarning';
import HapticButton from '@src/components/HapticButton/HapticButton';
import WatchModeTag from '@src/components/WatchModeTag/WatchModeTag';
import TokenAmountInput from '@src/components/TokenAmountInput/TokenAmountInput';
import ActivityIndicator from '@src/components/ActivityIndicator/ActivityIndicator';
import { TokenType } from '@styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { decimalSeparator } from 'expo-localization';
import { useKeyboard, useLanguage } from '@hooks';
import { styles } from './TransactionTransfer.styles';
import { TransactionTransferProps } from './TransactionTransfer.types';
import { Card, GasPriceLine } from '../../components';
import { useTransactionTransfer } from './TransactionTransfer.hooks';

const TransactionTransfer: React.FC<TransactionTransferProps> = ({ token, user, onError, ...props }) => {
	const { i18n } = useLanguage();
	const keyboardVisible = useKeyboard();
	const {
		image,
		amount,
		number,
		gasPrice,
		sending,
		amountType,
		gasless,
		enoughGas,
		canSendTransactions,
		needToChangeNetwork,
		onChangeAmount,
		onChangeNumber,
		onSend,
		onMaxPress,
		onTypeChange
	} = useTransactionTransfer({ token, user, onError, ...props });

	return (
		<View style={styles.container}>
			<>
				{!keyboardVisible && (
					<View style={styles.imageContainer}>
						<Token name={token.symbol.toLowerCase() as TokenType} size={64} />
						{image && <Image style={[styles.image, { marginLeft: -20, zIndex: -1 }]} source={image} />}
					</View>
				)}
				<Text type="h3" weight="extraBold" mb="m">
					{i18n.t('Components.ModalReusables.SendModal.screens.TransactionTransfer.how_much')}
					<Text color="text12" type="h3" weight="extraBold">
						{amountType === 'token' ? token.symbol : 'USD'}
					</Text>
					{i18n.t('Components.ModalReusables.SendModal.screens.TransactionTransfer.wanna_send')}
				</Text>
			</>

			<Card token={token} />

			<TokenAmountInput
				amount={amount}
				symbol={token.symbol}
				onAmountChange={onChangeAmount}
				onNumberAmountChange={onChangeNumber}
				isAmountValid={
					(number || 0) <=
					(amountType === 'token'
						? Number(token.balanceAvailable || token.balance!)
						: token.balanceAvailableUSD || token.balanceUSD!)
				}
				autoFocus
				placeholder={amountType === 'fiat' ? `$00${decimalSeparator}00` : `0${decimalSeparator}00`}
				onMaxPress={onMaxPress}
				onTypeChange={onTypeChange}
			/>

			{!gasless && gasPrice && (
				<View style={{ marginBottom: 24 }}>
					<GasPriceLine
						label="Normal"
						gas={+gasPrice.result.ProposeGasPrice}
						priceUSD={+gasPrice.result.UsdPrice!}
					/>
				</View>
			)}

			{!enoughGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}

			<NetworkWarning.Tag />

			<View style={{ marginBottom: 8, marginTop: 24 }}>
				{sending ? (
					<ActivityIndicator />
				) : (
					<HapticButton
						title={i18n.t('Components.Buttons.send')}
						disabled={
							!canSendTransactions ||
							!enoughGas ||
							!number ||
							number >
								(amountType === 'token'
									? Number(token.balanceAvailable || token.balance!)
									: token.balanceAvailableUSD || token.balanceUSD!)
						}
						onPress={onSend}
					/>
				)}
			</View>

			{!canSendTransactions && (
				<View style={{ marginTop: 8 }}>
					<WatchModeTag needToChangeNetwork={needToChangeNetwork} />
				</View>
			)}
			<KeyboardSpacer />
		</View>
	);
};

export default TransactionTransfer;
