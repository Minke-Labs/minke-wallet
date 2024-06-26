import React from 'react';
import { View, Platform } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { Text, Button } from '@components';
import { useNavigation, useLanguage } from '@hooks';
import { SaveLayout } from '@layouts';

type Props = NativeStackScreenProps<RootStackParamList, 'DepositWithdrawalSuccessScreen'>;
const DepositWithdrawalSuccessScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('DepositWithdrawalSuccessScreen');
	const { type } = route.params;
	const { i18n } = useLanguage();
	const navigation = useNavigation();

	return (
		<SaveLayout>
			<Text type="h1" weight="extraBold" color="text1" mb="m">
				{i18n.t('DepositWithdrawalSuccessScreen.congrats')}
			</Text>
			<Text type="p2" color="text3" mb="m">
				{type === 'deposit'
					? i18n.t('DepositWithdrawalSuccessScreen.you_deposited')
					: i18n.t('DepositWithdrawalSuccessScreen.you_withdrawn')}
			</Text>
			<View
				style={{
					marginTop: Platform.OS === 'android' ? undefined : 'auto',
					width: '100%',
					marginBottom: 48,
					paddingHorizontal: 16
				}}
			>
				<Button title={i18n.t('Components.Buttons.done')} onPress={() => navigation.navigate('HomeScreen')} />
			</View>
		</SaveLayout>
	);
};

export default DepositWithdrawalSuccessScreen;
