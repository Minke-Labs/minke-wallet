import React, { useEffect } from 'react';
import { Linking, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Icon, Text, Button, TransparentCard, ActivityIndicator } from '@components';
import { useAmplitude, useNavigation } from '@hooks';
import { BasicLayout } from '@layouts';
import styles from './OpenAave.styles';
import { Background } from './Background/Background';
import { useOpenAave } from './OpenAave.hooks';

const OpenAave = ({ onApprove }: { onApprove: () => void }) => {
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { loading, onOpenAccount, gaslessApprovalEnabled } = useOpenAave({ onApprove });

	useEffect(() => {
		track('OpenAave Screen Opened');
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
							Open Aave {'\n'}Savings Account
						</Text>

						<TransparentCard marginBottom={8}>
							<Text weight="extraBold" marginBottom={12} style={{ width: '100%' }}>
								What is Aave
							</Text>
							<Text type="a">
								Aave lets you earn interest on your crypto and stablecoins by lending it to borrowers.
								Aave is a decentralized protocol for lending and borrowing crypto. Rates are variable
								and can change at any time. {'\n\n'}
								Risks include the economics of the protocol, market risks, security of the smart
								contracts, counterparty risk and more. Aave has been audited by Trail of Bits and Open
								Zeppelin.
							</Text>
						</TransparentCard>

						<View style={styles.actionContainer}>
							<TouchableOpacity onPress={() => Linking.openURL('https://aave.com/')}>
								<TransparentCard row padding={16}>
									<Icon name="siteStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
									<Text type="a" color="text2">
										View Site
									</Text>
									<Icon name="chevronRight" color="cta1" size={24} />
								</TransparentCard>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => Linking.openURL('https://docs.aave.com/faq/')}>
								<TransparentCard row padding={16}>
									<Icon name="learnStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
									<Text type="a" color="text2">
										Learn More
									</Text>
									<Icon name="chevronRight" color="cta1" size={24} />
								</TransparentCard>
							</TouchableOpacity>
						</View>
					</SafeAreaView>
					<View style={{ bottom: 34 }}>
						<Button
							iconRight="arrowRight"
							title={loading ? 'Opening your account' : 'Open account'}
							marginBottom={16}
							onPress={onOpenAccount}
							disabled={loading}
						/>
						{!gaslessApprovalEnabled && (
							<Text type="span" color="text2" style={{ textAlign: 'center' }}>
								This transaction will cost a few cents.
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

export default OpenAave;
