import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WelcomeLayout } from '@layouts';
import { RootStackParamList } from '@src/routes/types.routes';
import { ParaswapToken } from '@models/token';
import { Icon, Text } from '@components';
import { Card } from 'react-native-paper';
import { useTheme } from '@hooks';
import { makeStyles } from './DepositScreen.styles';
import TokenCard from '../ExchangeScreen/TokenCard';

const DepositScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const [token, setToken] = React.useState<ParaswapToken>({} as ParaswapToken);
	return (
		<WelcomeLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>
			<View style={styles.deposit}>
				<View style={styles.depositHeadline}>
					<Text type="h3" weight="extraBold">
						Deposit
					</Text>
					<Text type="a" weight="regular" color="text3">
						Balance:{' '}
						<Text type="a" weight="extraBold" color="text3">
							2800 USDC
						</Text>
					</Text>
				</View>

				<Card style={styles.tokenCard}>
					{/* <TokenCard
						token={token}
						onPress={showModalFrom}
						balance={fromTokenBalance}
						innerRef={fromAmountRef}
						updateQuotes={() => console.log('update tokens')}
					/> */}
				</Card>
			</View>
		</WelcomeLayout>
	);
};

export default DepositScreen;
