import React from 'react';
import { SafeAreaView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { BlankStates, ModalBase, Header, Icon } from '@components';
import { useReferralCode, useNavigation, useMinkeRewards, useLanguage } from '@hooks';
import { Background } from './Background/Background';
import { CurrentValue } from './CurrentValue/CurrentValue';
import useReferralScreen from './ReferralScreen.hooks';
import HelpModal from './HelpModal/HelpModal';
import EarnModal from './EarnModal/EarnModal';
import { Body } from './Body/Body';

const ReferralScreen = () => {
	RNUxcam.tagScreenName('ReferralScreen');
	const { i18n } = useLanguage();
	const { helpModalVisible, onHelpPress, onHelpDismiss, earnModalVisible, onEarnPress, onEarnDismiss } =
		useReferralScreen();
	const navigation = useNavigation();
	const { code } = useReferralCode();
	const onRedeemPress = () => navigation.navigate('RedeemScreen', { code });
	const { rewards, points, loading } = useMinkeRewards();

	if (loading) return <BlankStates.Type2 title={i18n.t('ReferralScreen.Header.points')} />;

	return (
		<>
			<BasicLayout hideSafeAreaView bgc="detail4">
				<SafeAreaView>
					<Background>
						<Header
							title={i18n.t('ReferralScreen.Header.points')}
							onRightActionClick={onHelpPress}
							rightAction={<Icon name="infoStroke" color="text7" size={24} />}
						/>
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
