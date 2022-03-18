/* eslint-disable operator-linebreak */
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Icon, Text } from '@components';
import { useNavigation, useTheme, useWyreOrderStatus } from '@hooks';
import { WYRE_ORDER_STATUS_TYPES } from '@models/wyre.types';
import { useState } from '@hookstate/core';
import { globalTopUpState, TopUpState } from '@stores/TopUpStore';
import { makeStyles } from './TopUpWaitScreen.styles';

const TopUpWaitScreen = () => {
	const navigation = useNavigation();
	const topUpState = useState(globalTopUpState());
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { status, transactionHash } = useWyreOrderStatus();

	const isFailed = status === WYRE_ORDER_STATUS_TYPES.failed;
	const checking = status === WYRE_ORDER_STATUS_TYPES.checking;
	const processing = status === WYRE_ORDER_STATUS_TYPES.pending;
	const success = status === WYRE_ORDER_STATUS_TYPES.success;

	const onFinish = () => {
		topUpState.set({} as TopUpState);
		navigation.navigate('WalletScreen');
	};

	const Failed = useCallback(
		() => (
			<View>
				<View style={[styles.statusIcon, styles.failed]}>
					<Icon name="closeStroke" color="alert1" size={32} />
				</View>
				<Text type="h3" weight="extraBold" center width={275} style={{ marginBottom: 40 }}>
					Oh no! Something has gone wrong. Please try again later or contact the support
				</Text>
				<Button title="Ok, got it" onPress={onFinish} />
			</View>
		),
		[isFailed]
	);
	const Processing = useCallback(
		() => (
			<View>
				<ActivityIndicator size="large" style={{ marginBottom: 24 }} />
				<Text type="h3" weight="extraBold" center width={275} marginBottom={24}>
					{transactionHash
						? 'Almost there... this might take a minute...'
						: `Please wait while we ${checking ? 'check' : 'process'} your payment...`}
				</Text>
				<Text type="p" center width={275}>
					{transactionHash && `Transaction: ${transactionHash}`}
				</Text>
			</View>
		),
		[processing, checking, transactionHash]
	);

	const Success = useCallback(
		() => (
			<View>
				<View style={[styles.statusIcon, styles.success]}>
					<Icon name="checkColor" color="alert3" size={32} />
				</View>
				<Text type="h3" weight="extraBold" center marginBottom={40} width={275}>
					Your funds have been added to your wallet!
				</Text>
				<Button title="Done" onPress={onFinish} />
			</View>
		),
		[success]
	);

	return (
		<View style={styles.container}>
			{isFailed && <Failed />}
			{(checking || processing) && <Processing />}
			{success && <Success />}
		</View>
	);
};

export default TopUpWaitScreen;
