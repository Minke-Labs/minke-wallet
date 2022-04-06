import React from 'react';
import { useTheme } from '@hooks';
import { View } from 'react-native';
import Icon from '../../Icon/Icon';
import IconInner from './IconInner/IconInner';
import { makeStyles } from './TransactionIcon.styles';
import { TransactionIconProps } from './TransactionIcon.types';

const TransactionIcon: React.FC<TransactionIconProps> = ({ received, pending, failed }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={[styles.container, { ...(received && { borderColor: colors.alert3 }) }]}>
			<Icon name={received ? 'arrowDown' : 'arrowUp'} color={received ? 'alert3' : 'text3'} size={20} />
			<IconInner {...{ pending, failed }} />
		</View>
	);
};

export default TransactionIcon;