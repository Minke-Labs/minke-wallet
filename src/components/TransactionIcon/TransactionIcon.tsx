/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { useTheme } from '@hooks';
import { View } from 'react-native';
import Icon from '../Icon/Icon';
import IconInner from './IconInner/IconInner';
import { makeStyles } from './TransactionIcon.styles';
import { TransactionIconProps } from './TransactionIcon.types';

const TransactionIcon: React.FC<TransactionIconProps> = ({
	received,
	pending,
	failed,
	topUp,
	exchange,
	deposit,
	withdraw
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={[styles.container, { ...((received || deposit) && { borderColor: colors.alert3 }) }]}>
			<Icon
				name={
					deposit || withdraw
						? 'saveStroke'
						: exchange
						? 'exchangeStroke'
						: topUp
						? 'appleStroke'
						: received
						? 'arrowDown'
						: 'arrowUp'
				}
				color={received || deposit ? 'alert3' : 'text3'}
				size={20}
			/>
			<IconInner {...{ pending, failed }} />
		</View>
	);
};

export default TransactionIcon;
