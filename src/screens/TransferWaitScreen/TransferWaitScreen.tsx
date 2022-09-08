import React, { useEffect } from 'react';
import { View } from 'react-native';
import useWyreTransferStatus from '@src/hooks/useWyreTransferStatus';
import { BasicLayout } from '@layouts';
import { useGlobalWalletState, useNavigation, useTransactions } from '@hooks';
import { useState } from '@hookstate/core';
import { globalRedeemState, RedeemState } from '@stores/RedeemStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { Processing } from '../TopUpWaitScreen/Processing/Processing';

type Props = NativeStackScreenProps<RootStackParamList, 'TransferWaitScreen'>;
const TransferWaitScreen = ({ route }: Props) => {
	const { transferId } = route.params;
	const { transactionHash, amount, currency } = useWyreTransferStatus(transferId);
	const navigation = useNavigation();
	const redeemState = useState(globalRedeemState());
	const { address } = useGlobalWalletState();
	const { addPendingTransaction } = useTransactions();

	const onFinish = () => {
		redeemState.set({} as RedeemState);
		navigation.navigate('HomeScreen');
	};

	useEffect(() => {
		const addTransaction = async (hash: string) => {
			addPendingTransaction({
				hash,
				txSuccessful: true,
				pending: true,
				timeStamp: (new Date().getTime() / 1000).toString(),
				amount: amount!.toString(),
				destination: address,
				from: address,
				direction: 'incoming',
				symbol: currency!
			});
			onFinish();
		};

		if (transactionHash && amount) {
			addTransaction(transactionHash);
		}
	}, [transactionHash, amount]);

	return (
		<BasicLayout>
			<View
				style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', padding: 10, alignItems: 'center' }}
			>
				<Processing transactionHash={transactionHash} transfer />
			</View>
		</BasicLayout>
	);
};

export default TransferWaitScreen;
