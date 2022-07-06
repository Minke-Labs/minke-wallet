import React from 'react';
import { SafeAreaView } from 'react-native';
import { BasicLayout } from '@layouts';
import { Modal } from '@components';
import { useReferralCode, useNavigation, useMinkeRewards } from '@hooks';
import { Background } from './Background/Background';
import { Header } from './Header/Header';
import { CurrentValue } from './CurrentValue/CurrentValue';
import useReferralScreen from './ReferralScreen.hooks';
import HelpModal from './HelpModal/HelpModal';
import EarnModal from './EarnModal/EarnModal';
import { Body } from './Body/Body';

const ReferralScreen = () => {
	const { helpModalVisible, onHelpPress, onHelpDismiss, earnModalVisible, onEarnPress, onEarnDismiss } =
		useReferralScreen();
	const navigation = useNavigation();
	const { code } = useReferralCode();
	const onRedeemPress = () => navigation.navigate('RedeemScreen', { code });
	const { rewards, points } = useMinkeRewards();

	return (
		<>
			<BasicLayout hideSafeAreaView bg="detail4">
				<SafeAreaView>
					<Background>
						<Header onHelpPress={onHelpPress} />
						<CurrentValue points={points} onEarnPress={onEarnPress} onRedeemPress={onRedeemPress} />
					</Background>
				</SafeAreaView>
				<Body rewards={rewards} onEarnPress={onEarnPress} />
			</BasicLayout>
			<Modal isVisible={helpModalVisible} onDismiss={onHelpDismiss}>
				<HelpModal onDismiss={onHelpDismiss} />
			</Modal>
			<Modal isVisible={earnModalVisible} onDismiss={onEarnDismiss}>
				<EarnModal onDismiss={onEarnDismiss} code={code} />
			</Modal>
		</>
	);
};

export default ReferralScreen;
