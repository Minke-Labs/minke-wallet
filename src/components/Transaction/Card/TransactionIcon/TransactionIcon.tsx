import React from 'react';
import { useTheme } from '@hooks';
import { View } from 'react-native';
import Icon from '../../../Icon/Icon';
import { makeStyles } from './TransactionIcon.styles';
import { TransactionIconProps } from './TransactionIcon.types';

const TransactionIcon: React.FC<TransactionIconProps> = ({ received, failed }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View
			style={[
				styles.container,
				{ ...(received && { borderColor: colors.alert3 }) }
			]}
		>
			<Icon
				name="arrowStroke"
				color={received ? 'alert3' : 'text3'}
				size={20}
				style={{ ...(received && { transform: [{ rotate: '180deg' }] }) }}
			/>
			{ failed && <View style={styles.inner} /> }
		</View>
	);
};

export default TransactionIcon;
