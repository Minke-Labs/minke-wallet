import React from 'react';
import { SafeAreaView } from 'react-native';
import { BasicLayout } from '@layouts';
import { BlankStates, ModalBase } from '@components';
import { useReferralCode, useNavigation, useMinkeRewards, useLanguage } from '@hooks';
import { Background } from './Background/Background';
import { Header } from './Header/Header';
import { CurrentValue } from './CurrentValue/CurrentValue';
import useReferralScreen from './ReferralScreen.hooks';
import HelpModal from './HelpModal/HelpModal';
import EarnModal from './EarnModal/EarnModal';
import { Body } from './Body/Body';

const ReferralScreen = () => {
	const { i18n } = useLanguage();
	const { helpModalVisible, onHelpPress, onHelpDismiss, earnModalVisible, onEarnPress, onEarnDismiss } =
		useReferralScreen();
	const navigation = useNavigation();
	const { code } = useReferralCode();
	const onRedeemPress = () => navigation.navigate('RedeemScreen', { code });
	const { rewards, points, loading } = useMinkeRewards();

	if (loading) return <BlankStates.Type2 title={i18n.t('Components.BlankStates.Referral')} />;

	return (
		<>
			<BasicLayout hideSafeAreaView bgc="detail4">
				<SafeAreaView>
					<Background>
						<Header onHelpPress={onHelpPress} />
						<CurrentValue points={points} onEarnPress={onEarnPress} onRedeemPress={onRedeemPress} />
					</Background>
				</SafeAreaView>
				<Body rewards={rewards} onEarnPress={onEarnPress} />
			</BasicLayout>

			<ModalBase isVisible={helpModalVisible} onDismiss={onHelpDismiss}>
				<HelpModal onDismiss={onHelpDismiss} />
			</ModalBase>
			<ModalBase isVisible={earnModalVisible} onDismiss={onEarnDismiss}>
				<EarnModal onDismiss={onEarnDismiss} code={code} />
			</ModalBase>
		</>
	);
};

export default ReferralScreen;
