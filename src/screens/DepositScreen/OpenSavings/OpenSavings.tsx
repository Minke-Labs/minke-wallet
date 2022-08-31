import React, { useEffect } from 'react';
import { TouchableOpacity, View, SafeAreaView } from 'react-native';
import {
	Icon,
	Text,
	HapticButton,
	ActivityIndicator,
	AaveReusables,
	MStableReusables,
	WatchModeTag
} from '@components';
import { useAmplitude, useNavigation, useLanguage, useDepositProtocols } from '@hooks';
import { BasicLayout } from '@layouts';
import styles from './OpenSavings.styles';
import { useOpenDepositAccount } from '../OpenDepositAccount.hooks';

const Background: React.FC = ({ children }) => {
	const { selectedProtocol } = useDepositProtocols();

	if (selectedProtocol?.id === 'aave') {
		return <AaveReusables.Background ghostTop={410}>{children}</AaveReusables.Background>;
	}

	return <MStableReusables.Background coinTop={450}>{children}</MStableReusables.Background>;
};

const OpenSavings = ({ onApprove }: { onApprove: () => void }) => {
	const { i18n } = useLanguage();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { selectedProtocol } = useDepositProtocols();
	const { loading, onOpenAccount, gaslessEnabled, canSendTransactions, needToChangeNetwork, cannotOpenAccount } =
		useOpenDepositAccount({
			onApprove
		});

	useEffect(() => {
		track('OpenSavings Screen Opened', {
			gasless: gaslessEnabled,
			protocol: selectedProtocol?.id
		});
	}, []);

	return (
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
							{i18n.t(`DepositScreen.OpenSavings.${selectedProtocol?.id}`)}
						</Text>

						{selectedProtocol?.id === 'aave' ? (
							<AaveReusables.Info fullHeight />
						) : (
							<MStableReusables.Info fullHeight />
						)}
					</SafeAreaView>

					<View style={{ bottom: 34 }}>
						{!canSendTransactions && (
							<View style={{ marginBottom: 8 }}>
								<WatchModeTag needToChangeNetwork={needToChangeNetwork} />
							</View>
						)}
						<HapticButton
							title={
								cannotOpenAccount
									? i18n.t('DepositScreen.OpenSavings.please_read_it')
									: i18n.t('DepositScreen.OpenSavings.open_account')
							}
							marginBottom={16}
							onPress={onOpenAccount}
							disabled={loading || !canSendTransactions || cannotOpenAccount}
						/>
						{!gaslessEnabled && (
							<Text type="span" color="text2" style={{ textAlign: 'center' }}>
								{i18n.t('DepositScreen.OpenSavings.this_transaction')}
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
	);
};

export default OpenSavings;
