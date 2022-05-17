import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import styles from './PendingTransaction.styles';

const PendingTransaction: React.FC = () => {
	const { colors } = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: colors.detail4 }]}>
			<View
				style={{
					height: '100%',
					flexDirection: 'row',
					alignItems: 'center',
					borderWidth: 1,
					borderColor: 'red',
					flex: 1
				}}
			>
				<Icon
					name="checkmark"
					size={24}
					color="alert3"
					style={{ marginRight: 8 }}
				/>
				<View>
					<Text type="p2" weight="semiBold">Succes!</Text>
					<Text type="span" weight="semiBold">3 min.</Text>
				</View>
			</View>
			<View style={{
				borderWidth: 1,
				borderColor: 'green',
				flex: 1
			}}
			>
				<Icon
					name="arrowRight"
					size={22}
					color="text7"
				/>
			</View>
			<View
				style={{
					borderWidth: 1,
					borderColor: 'purple',
					height: '100%',
					justifyContent: 'space-between',
					flex: 1
				}}
			>
				<Text type="p2">To fridder.eth</Text>
				<Text type="span" weight="semiBold">0.01 ETH</Text>
			</View>
		</View>
	);
};

export default PendingTransaction;
