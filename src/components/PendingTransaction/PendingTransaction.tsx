import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
// import Text from '../Text/Text';
import styles from './PendingTransaction.styles';

const PendingTransaction: React.FC = () => {
	const { colors } = useTheme();

	return (
		<View
			style={[styles.container, { backgroundColor: colors.detail4 }]}
		/>
	);
};

export default PendingTransaction;
