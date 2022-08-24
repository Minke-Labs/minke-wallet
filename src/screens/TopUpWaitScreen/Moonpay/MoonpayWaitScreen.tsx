import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { makeStyles } from '../TopUpWaitScreen.styles';
import { Failed } from '../Failed/Failed';
import { Processing } from '../Processing/Processing';
import { Success } from '../Success/Success';
import useMoonpayWaitScreen from './MoonpayWaitScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'MoonpayWaitScreen'>;
const MoonpayWaitScreen = ({ route }: Props) => {
	const { transactionId } = route.params;
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const { isFailed, checking, processing, onFinish, success, transactionHash } = useMoonpayWaitScreen(transactionId);
	return (
		<View style={styles.container}>
			{isFailed && <Failed {...{ onFinish }} orderId={transactionId} />}
			{(checking || processing) && <Processing {...{ transactionHash }} />}
			{success && <Success {...{ onFinish }} />}
		</View>
	);
};

export default MoonpayWaitScreen;
