import React from 'react';
import { View, FlatList } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useState } from '@hookstate/core';
import * as Clipboard from 'expo-clipboard';
import { globalWalletState } from '@stores/WalletStore';
import { Token, Text, PaperTouchable, ApplePayButton, Icon } from '@components';
import { TokenType } from '@styles';
import { ICoin } from '@helpers/coins';
import { useNavigation, useWyreApplePay } from '@hooks';

interface ChooseQuantityModalProps {
	coin: ICoin;
	amount: number | undefined;
	setPresetAmount: Function;
	enableCustomAmount: () => void;
	onTopUpFinish: () => void;
}

const ChooseQuantityModal: React.FC<ChooseQuantityModalProps> = ({
	coin,
	amount = 100,
	setPresetAmount,
	enableCustomAmount,
	onTopUpFinish
}) => {
	const navigation = useNavigation();
	const { name, symbol } = coin;
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);
	const { address } = useState(globalWalletState()).value;

	const onCopyToClipboard = () => {
		Clipboard.setString(address || '');
		setSnackbarVisible(true);
	};

	const { isPaymentComplete, onPurchase, orderId } = useWyreApplePay();

	if (isPaymentComplete && orderId) {
		console.log('Payment is complete go to the page to track it', orderId);
		navigation.navigate('TopUpWaitScreen');
		onTopUpFinish();
	}

	return (
		<>
			<View style={{ paddingHorizontal: 24 }}>
				<View style={{ flexDirection: 'row', marginBottom: 8 }}>
					<Token name={symbol.toLowerCase() as TokenType} size={40} />
					<Text weight="extraBold" type="h3" style={{ marginLeft: 8 }}>
						{name}
					</Text>
				</View>
				<Text marginBottom={20}>
					Buy some {coin.symbol} with <Text weight="extraBold">Apple Pay</Text> to start using Minke:
				</Text>
				<FlatList
					style={{ marginBottom: 20 }}
					contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }}
					keyExtractor={(item) => item.toString()}
					data={[100, 200, 300]}
					renderItem={({ item }) => (
						<PaperTouchable active={amount === item} onPress={() => setPresetAmount(item)}>
							<Text type="h3" weight="medium" color={amount === item ? 'text8' : 'text1'}>
								${item}
							</Text>
						</PaperTouchable>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
				<PaperTouchable marginBottom={20} onPress={enableCustomAmount}>
					<Text type="a">Choose another amount</Text>
				</PaperTouchable>

				{amount > 0 && (
					<ApplePayButton marginBottom={48} onPress={() => onPurchase({ currency: symbol, value: amount })} />
				)}

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 20
					}}
				>
					<View
						style={{
							width: 40,
							height: 40,
							backgroundColor: '#fff',
							borderRadius: 20,
							justifyContent: 'center',
							alignItems: 'center',
							marginRight: 12
						}}
					>
						<Icon name="addStroke" color="brand4" size={24} />
					</View>
					<Text weight="extraBold" type="h3">
						or deposit
					</Text>
				</View>

				<Text marginBottom={20}>
					Send from <Text weight="extraBold">coinbase</Text> or another exchange
				</Text>

				<PaperTouchable onPress={onCopyToClipboard}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon name="copyStroke" style={{ marginRight: 8 }} size={16} />
						<Text>Copy address</Text>
					</View>
				</PaperTouchable>
			</View>

			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text style={{ color: '#FFFFFF' }}>Address copied!</Text>
			</Snackbar>
		</>
	);
};

export default ChooseQuantityModal;
