import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { makeStyles } from './TopUpWaitScreen.styles';
import { Failed } from './Failed/Failed';
import { Processing } from './Processing/Processing';
import { Success } from './Success/Success';
import { useTopUpWaitScreen } from './TopUpWaitScreen.hooks';

const TopUpWaitScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { isFailed, checking, processing, success, onFinish, orderId, transactionHash } = useTopUpWaitScreen();

	return (
		<View style={styles.container}>
			{isFailed && <Failed {...{ orderId, onFinish }} />}
			{(checking || processing) && <Processing {...{ transactionHash, checking }} />}
			{success && <Success {...{ onFinish }} />}
		</View>
	);
};

export default TopUpWaitScreen;
