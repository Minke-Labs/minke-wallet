import React from 'react';
import { useTheme } from '@hooks';
import { View } from 'react-native';
import { Icon } from '@components';
import { styles } from './TransactionIcon.styles';
import { TransactionIconProps } from './TransactionIcon.types';

const TransactionIcon: React.FC<TransactionIconProps> = ({ received }) => {
	const { colors } = useTheme();
	return (
		<View
			style={[
				styles.circle,
				{
					borderColor: colors.text3,
					...(received && {
						transform: [{ rotate: '180deg' }],
						borderColor: colors.alert3
					})
				}
			]}
		>
			<Icon name="arrowStroke" color={received ? 'alert3' : 'text3'} size={20} />
		</View>
	);
};

export default TransactionIcon;
