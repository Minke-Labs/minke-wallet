import React from 'react';
import { View, ImageBackground, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { Text, Button } from '@components';
import { useTheme, useNavigation, useLanguage } from '@hooks';
import { bgSaveBackground, bgSaveBackgroundDark } from '@images';
import { makeStyles } from './DepositWithdrawalSuccessScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'DepositWithdrawalSuccessScreen'>;
const DepositWithdrawalSuccessScreen = ({ route }: Props) => {
	const { type } = route.params;
	const { i18n } = useLanguage();
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
						{i18n.t('DepositWithdrawalSuccessScreen.congrats')}
					</Text>
					<Text type="p2" color="text3" marginBottom={32} style={styles.textCenter}>
						{type === 'deposit'
							? i18n.t('DepositWithdrawalSuccessScreen.you_deposited')
							: i18n.t('DepositWithdrawalSuccessScreen.you_withdrawn')}
					</Text>

					<View style={{ marginTop: 'auto', width: '100%', marginBottom: 48 }}>
						<Button
							title={i18n.t('Components.Buttons.done')}
							onPress={() => navigation.navigate('WalletScreen')}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default DepositWithdrawalSuccessScreen;
