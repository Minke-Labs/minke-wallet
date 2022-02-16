import React from 'react';
import { useTheme } from '@hooks';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@components';

const styles = StyleSheet.create({
	circle: {
		width: 32,
		height: 32,
		borderRadius: 16,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const TransactionIcon: React.FC<{ received: boolean }> = ({ received }) => {
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
