import { useCallback, useEffect, useState } from 'react';
import { MOONPAY_API_KEY } from '@env';
import { useNavigation, useTransactions } from '@hooks';

interface MoonpayTransaction {
	status: string;
	transactionHash: string;
	baseCurrency: string;
	quoteCurrencyAmount: string;
	address: string;
}

const useMoonpayWaitScreen = (transactionId: string) => {
	const [transaction, setTransaction] = useState<MoonpayTransaction>({} as MoonpayTransaction);
	const apiKey = MOONPAY_API_KEY || process.env.MOONPAY_API_KEY;
	const navigation = useNavigation();
	const { addPendingTransaction } = useTransactions();

	const fetchTransaction = useCallback(async () => {
		const response = await fetch(`https://api.moonpay.com/v1/transactions/${transactionId}?apiKey=${apiKey}`);
		const { status, cryptoTransactionId, quoteCurrencyAmount, currency, walletAddress } = await response.json();
		setTransaction({
			status,
			quoteCurrencyAmount,
			baseCurrency: currency.code.toUpperCase(),
			transactionHash: cryptoTransactionId,
			address: walletAddress
		});

		if (!cryptoTransactionId && status !== 'failed') {
			setTimeout(() => fetchTransaction(), 3000);
		}
	}, [transaction]);

	useEffect(() => {
		fetchTransaction();
	}, [transactionId]);

	const { status } = transaction;
	const isFailed = status === 'failed';
	const checking = status === 'waitingPayment';
	const processing = status === 'pending' || status === 'waitingAuthorization';
	const success = status === 'completed';

	const onFinish = () => {
		navigation.navigate('HomeScreen');
	};

	useEffect(() => {
		const addTransaction = async (hash: string) => {
			addPendingTransaction({
				topUp: true,
				hash,
				txSuccessful: true,
				pending: true,
				timeStamp: (new Date().getTime() / 1000).toString(),
				amount: transaction.quoteCurrencyAmount,
				destination: transaction.address,
				from: transaction.address,
				direction: 'incoming',
				symbol: transaction.baseCurrency
			});
			onFinish();
		};

		if (transaction.transactionHash && !isFailed) {
			addTransaction(transaction.transactionHash);
		}
	}, [transaction]);

	return {
		isFailed,
		checking,
		processing,
		success,
		onFinish,
		transactionHash: transaction.transactionHash
	};
};

export default useMoonpayWaitScreen;
