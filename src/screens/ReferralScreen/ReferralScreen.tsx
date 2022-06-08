import React from 'react';
import { SafeAreaView } from 'react-native';
import { BasicLayout } from '@layouts';
import { Modal } from '@components';
import { Background } from './Background/Background';
import { Header } from './Header/Header';
import { CurrentValue } from './CurrentValue/CurrentValue';
import useReferralScreen from './ReferralScreen.hooks';
import HelpModal from './HelpModal/HelpModal';
import EarnModal from './EarnModal/EarnModal';
import RedeemModal from './RedeemModal/RedeemModal';

const ReferralScreen = () => {
	const {
		helpModalVisible,
		onHelpPress,
		onHelpDismiss,
		earnModalVisible,
		onEarnPress,
		onEarnDismiss,
		redeemModalVisible,
		onRedeemPress,
		onRedeemDismiss
	} = useReferralScreen();
	return (
		<>
			<BasicLayout hideSafeAreaView bg="detail4">
				<SafeAreaView>
					<Background>
						<Header onHelpPress={onHelpPress} />
						<CurrentValue onEarnPress={onEarnPress} onRedeemPress={onRedeemPress} />
					</Background>
				</SafeAreaView>
			</BasicLayout>
			<Modal isVisible={helpModalVisible} onDismiss={onHelpDismiss}>
				<HelpModal onDismiss={onHelpDismiss} />
			</Modal>
			<Modal isVisible={earnModalVisible} onDismiss={onEarnDismiss}>
				<EarnModal onDismiss={onEarnDismiss} />
			</Modal>
			<Modal isVisible={redeemModalVisible} onDismiss={onRedeemDismiss}>
				<RedeemModal onDismiss={onRedeemDismiss} />
			</Modal>
		</>
	);
};

export default ReferralScreen;
