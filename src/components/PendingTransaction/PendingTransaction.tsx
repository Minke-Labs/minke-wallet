import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { smallWalletAddress } from '@src/model/wallet';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import styles from './PendingTransaction.styles';
import { PendingTransactionProps } from './PendingTransaction.types';

const PendingTransaction: React.FC<PendingTransactionProps> = ({ address, amount, symbol, pending, timestamp }) => {
	const { colors } = useTheme();

	const getTs = (ts: string) => new Date(Number(ts) * 1000).getTime();

	return (
		<View style={[styles.container, { backgroundColor: colors.detail4 }]}>
			<View style={styles.leftContainer}>
				{
					pending && pending ? (
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
						{ pending ? 'Pending' : 'Succes!' }
					</Text>
					<Text type="span" weight="semiBold">{getTs(timestamp)} min.</Text>
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
				<Text type="p2">{smallWalletAddress(address)}</Text>
				<Text type="span" weight="semiBold">{amount} {symbol}</Text>
			</View>
		</View>
	);
};

export default PendingTransaction;
