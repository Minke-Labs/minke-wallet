import React from 'react';
import RNUxcam from 'react-native-ux-cam';
import {
	Header,
	Button,
	View
} from '@components';
import { BasicLayout } from '@layouts';
import { useGlobalWalletState, useLanguage, useTransaction } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { networks } from '@models/network';
import { TitleContainer } from './TitleContainer/TitleContainer';
import { TransactionContainer } from './TransactionContainer/TransactionContainer';
import { AddressesContainer } from './AddressesContainer/AddressesContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionsDetailScreen'>;
const TransactionsDetailScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('TransactionsDetailScreen');
	const { transaction } = route.params;
	const { i18n } = useLanguage();
	const { network } = useGlobalWalletState();
	const explorer = network.id === networks.matic.id ? 'PolygonScan' : 'EtherScan';

	const {
		received,
		failed,
		pending,
		topUp,
		exchange,
		deposit,
		withdraw,
		date,
		description,
		source,
		formattedSource,
		value,
		token,
		sourceToken,
		toToken,
		fromAmount,
		hash,
		protocol,
		openTransaction
	} = useTransaction({
		transaction,
		walletDigits: 12
	});

	return (
		<>
			<BasicLayout>
				<Header title={description} />

				<TitleContainer
					{...{
						received,
						topUp,
						exchange,
						withdraw,
						value,
						token
					}}
				/>

				<TransactionContainer
					{...{
						received,
						topUp,
						exchange,
						withdraw,
						failed,
						pending,
						deposit,
						date,
						description
					}}
				/>

				<AddressesContainer
					{...{
						received,
						exchange,
						withdraw,
						deposit,
						source,
						formattedSource,
						sourceToken,
						toToken,
						fromAmount,
						hash,
						protocol,
						value
					}}
				/>

				<View mh="xs">
					<Button
						mode="outlined"
						title={`${i18n.t('Components.Transaction.view_on')} ${explorer}`}
						onPress={openTransaction}
					/>
				</View>
			</BasicLayout>
		</>
	);
};

export default TransactionsDetailScreen;
