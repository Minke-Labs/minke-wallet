import React, { useEffect } from 'react';
import { TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Icon, Text, HapticButton, ActivityIndicator, AaveReusables } from '@components';
import { useAmplitude, useNavigation, useLanguage } from '@hooks';
import { BasicLayout } from '@layouts';
import styles from './OpenAave.styles';
import { useOpenAave } from './OpenAave.hooks';

const OpenAave = ({ onApprove }: { onApprove: () => void }) => {
	const { i18n } = useLanguage();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { loading, onOpenAccount, gaslessEnabled } = useOpenAave({ onApprove });

	useEffect(() => {
		track('OpenAave Screen Opened');
	}, []);

	return (
		<BasicLayout hideSafeAreaView>
			<AaveReusables.Background ghostTop={410}>
				<View style={styles.container}>
					<SafeAreaView>
						<View style={styles.headerNavigation}>
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Icon name="arrowBackStroke" color="text7" size={24} />
							</TouchableOpacity>
						</View>
						<Text type="h3" weight="bold" color="text1" marginBottom={35}>
							{i18n.t('DepositScreen.OpenAave.open_aave')}
						</Text>
						<AaveReusables.Info />
					</SafeAreaView>

					<View style={{ bottom: 34 }}>
						<HapticButton
							title={i18n.t('DepositScreen.OpenAave.open_account')}
							marginBottom={16}
							onPress={onOpenAccount}
							disabled={loading}
						/>
						{!gaslessEnabled && (
							<Text type="span" color="text2" style={{ textAlign: 'center' }}>
								{i18n.t('DepositScreen.OpenAave.this_transaction')}
							</Text>
						)}
					</View>
					{loading && (
						<View style={styles.loadingBox}>
							<ActivityIndicator />
						</View>
					)}
				</View>
			</AaveReusables.Background>
		</BasicLayout>
	);
};

export default OpenAave;
