import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { Text, Button } from '@components';
import { useNavigation, useLanguage } from '@hooks';
import { SaveLayout } from '@layouts';

type Props = NativeStackScreenProps<RootStackParamList, 'DepositWithdrawalSuccessScreen'>;
const DepositWithdrawalSuccessScreen = ({ route }: Props) => {
	const { type } = route.params;
	const { i18n } = useLanguage();
	const navigation = useNavigation();

	return (
		<SaveLayout>
			<Text
				type="h1"
				weight="extraBold"
				color="text1"
				marginBottom={32}
			>
				{i18n.t('DepositWithdrawalSuccessScreen.congrats')}
			</Text>
			<Text
				type="p2"
				color="text3"
				marginBottom={32}
			>
				{type === 'deposit'
					? i18n.t('DepositWithdrawalSuccessScreen.you_deposited')
					: i18n.t('DepositWithdrawalSuccessScreen.you_withdrawn')}
			</Text>
			<View
				style={{
					marginTop: 'auto',
					width: '100%',
					 marginBottom: 48,
					  paddingHorizontal: 16
				}}
			>
				<Button
					title={i18n.t('Components.Buttons.done')}
					onPress={() => navigation.navigate('WalletScreen')}
				/>
			</View>
		</SaveLayout>
	);
};

export default DepositWithdrawalSuccessScreen;
