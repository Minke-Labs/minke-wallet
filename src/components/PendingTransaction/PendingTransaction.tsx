import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useLanguage, useTheme } from '@hooks';
import { getENSAddress, smallWalletAddress } from '@src/model/wallet';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import styles from './PendingTransaction.styles';
import { PendingTransactionProps } from './PendingTransaction.types';

const PendingTransaction: React.FC<PendingTransactionProps> = ({ address, amount, symbol, pending, timestamp }) => {
	const [ensName, setEnsName] = useState<string | null>();
	const { colors } = useTheme();
	const { i18n } = useLanguage();
	const getMin = (ts: string) => Math.floor(((new Date().getTime() / 1000) - Number(ts)) / 60);

	useEffect(() => {
		const fetchENSAddress = async () => {
			const name = await getENSAddress(address);
			setEnsName(name);
		};
		fetchENSAddress();
	}, []);

	return (
		<View style={[styles.container, { backgroundColor: colors.detail4 }]}>
			<View style={styles.leftContainer}>
				{
					pending ? (
						<ActivityIndicator size={26} />
					) : (
						<Icon
							name="checkmark"
							size={24}
							color="alert3"
						/>
					)
				}

				<View style={{ marginLeft: 8 }}>
					<Text type="p2" weight="semiBold">
						{ pending ?
							i18n.t('Components.PendingTransactions.pending') :
							i18n.t('Components.PendingTransactions.success') }
					</Text>
					<Text type="span" weight="semiBold">{getMin(timestamp)} min.</Text>
				</View>
			</View>

			<View style={styles.centerContainer}>
				<Icon
					name="arrowRight"
					size={22}
					color="text7"
				/>
			</View>

			<View style={styles.rightContainer}>
				<Text type="p2">{ensName ?? smallWalletAddress(address)}</Text>
				<Text type="span" weight="semiBold">{amount} {symbol}</Text>
			</View>
		</View>
	);
};

export default PendingTransaction;
