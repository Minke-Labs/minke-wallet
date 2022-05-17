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
					borderWidth: 1,
					borderColor: 'red',
					height: '100%',
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<Icon name="checkmark" size={24} color="alert3" />
				<View>
					<Text>asdf</Text>
					<Text>asdf</Text>
				</View>
			</View>
			<Icon
				name="arrowRight"
				size={22}
				color="text7"
			/>
			<View
				style={{
					borderWidth: 1,
					borderColor: 'purple',
					height: '100%'
				}}
			/>
		</View>
	);
};

export default PendingTransaction;
