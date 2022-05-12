import React, { useEffect } from 'react';
import { Linking, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Icon, Text, HapticButton, TransparentCard, ActivityIndicator, ModalReusables, Modal } from '@components';
import { useAmplitude, useNavigation, useLanguage } from '@hooks';
import { BasicLayout } from '@layouts';
import styles from './OpenAave.styles';
import { Background } from './Background/Background';
import { useOpenAave } from './OpenAave.hooks';

const OpenAave = ({ onApprove }: { onApprove: () => void }) => {
	const { i18n } = useLanguage();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const {
		loading,
		onOpenAccount,
		gaslessEnabled,
		blockchainError,
		setBlockchainError
	} = useOpenAave({ onApprove });

	useEffect(() => {
		track('OpenAave Screen Opened');
	}, []);

	return (
		<>
			<BasicLayout hideSafeAreaView>
				<Background>
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

							<TransparentCard marginBottom={8}>
								<Text weight="extraBold" marginBottom={12} style={{ width: '100%' }}>
									{i18n.t('DepositScreen.OpenAave.what_is')}
								</Text>
								<Text type="a">
									{i18n.t('DepositScreen.OpenAave.aave_des')}
								</Text>
							</TransparentCard>

							<View style={styles.actionContainer}>
								<TouchableOpacity onPress={() => Linking.openURL('https://aave.com/')}>
									<TransparentCard row padding={16}>
										<Icon name="siteStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
										<Text type="a" color="text2">
											{i18n.t('DepositScreen.OpenAave.view_site')}
										</Text>
										<Icon name="chevronRight" color="cta1" size={24} />
									</TransparentCard>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => Linking.openURL('https://docs.aave.com/faq/')}>
									<TransparentCard row padding={16}>
										<Icon name="learnStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
										<Text type="a" color="text2">
											{i18n.t('DepositScreen.OpenAave.learn_more')}
										</Text>
										<Icon name="chevronRight" color="cta1" size={24} />
									</TransparentCard>
								</TouchableOpacity>
							</View>
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
				</Background>
			</BasicLayout>

			<Modal isVisible={blockchainError} onDismiss={() => setBlockchainError(false)}>
				{blockchainError && (
					<ModalReusables.Error
						title={i18n.t('Components.ModalReusables.Error.Blockchain.title')}
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setBlockchainError(false)}
						showHeader
						buttonLabel={i18n.t('Components.ModalReusables.Error.Blockchain.button')}
					/>
				)}
			</Modal>
		</>
	);
};

export default OpenAave;
