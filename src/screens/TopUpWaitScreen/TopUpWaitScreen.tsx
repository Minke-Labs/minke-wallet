import React, { useCallback } from 'react';
import { View, Image } from 'react-native';
import { ActivityIndicator, Button, Icon, Text } from '@components';
import { useNavigation, useTheme, useWyreOrderStatus } from '@hooks';
import { WYRE_ORDER_STATUS_TYPES } from '@models/wyre.types';
import { topUpSuccess } from '@images';
import { makeStyles } from './TopUpWaitScreen.styles';

const TopUpWaitScreen = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { status, transactionHash } = useWyreOrderStatus();

	const isFailed = status === WYRE_ORDER_STATUS_TYPES.failed;
	const checking = status === WYRE_ORDER_STATUS_TYPES.checking;
	const processing = status === WYRE_ORDER_STATUS_TYPES.pending;
	const success = status === WYRE_ORDER_STATUS_TYPES.success;

	const Failed = useCallback(
		() => (
			<View>
				<Icon name="errorStroke" color="alert1" style={{ alignSelf: 'center', marginBottom: 24 }} />
				<Text type="h3" weight="extraBold" center width={275} style={{ marginBottom: 40 }}>
					Oh no! something has gone wrong. Please try again later or contact the support
				</Text>
				<Button title="Try again" onPress={() => navigation.navigate('WalletScreen')} />
			</View>
		),
		[isFailed]
	);
	const Processing = useCallback(
		() => (
			<View>
				<ActivityIndicator size="large" style={{ marginBottom: 24 }} />
				<Text type="h3" weight="extraBold" center width={275} marginBottom={24}>
					Please wait while we are {checking ? 'checking' : 'processing'} your payment...
				</Text>
				{transactionHash && (
					<Text type="p" center width={275}>
						Transaction: {transactionHash}
					</Text>
				)}
			</View>
		),
		[processing, checking, transactionHash]
	);

	const Success = useCallback(
		() => (
			<View>
				<Image source={topUpSuccess} style={{ width: 400, height: 400, marginBottom: 16 }} />
				<Text type="h3" weight="extraBold" center marginBottom={40}>
					Payment processed. Your tokens are available!
				</Text>
				<Button title="Done" onPress={() => navigation.navigate('WalletScreen')} />
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
