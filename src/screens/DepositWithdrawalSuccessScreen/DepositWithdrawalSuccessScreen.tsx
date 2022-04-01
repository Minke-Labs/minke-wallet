import React from 'react';
import { View, ImageBackground, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { Text, Button } from '@components';
import { useTheme, useNavigation } from '@hooks';
import { bgSaveBackground, bgSaveBackgroundDark } from '@images';
import { makeStyles } from './DepositWithdrawalSuccessScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'DepositWithdrawalSuccessScreen'>;
const DepositWithdrawalSuccessScreen = ({ route }: Props) => {
	const { type } = route.params;

	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const scheme = useColorScheme();
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<ImageBackground
				source={scheme === 'dark' ? bgSaveBackgroundDark : bgSaveBackground}
				style={styles.bgSaveEmptyScreen}
			/>
			<View style={styles.saveEmptyStateContent}>
				<View style={styles.saveEmptyStateCard}>
					<Text type="h1" weight="extraBold" color="text1" marginBottom={32} style={styles.textCenter}>
						Congrats!
					</Text>
					<Text type="p2" color="text3" marginBottom={32} style={styles.textCenter}>
						{type === 'deposit' ? "You've made your deposit!" : "You've withdrawed successfully!"}
					</Text>

					<View style={{ marginTop: 'auto', width: '100%', marginBottom: 48 }}>
						<Button title="Done" onPress={() => navigation.navigate('WalletScreen')} />
					</View>
				</View>
			</View>
		</View>
	);
};

export default DepositWithdrawalSuccessScreen;
