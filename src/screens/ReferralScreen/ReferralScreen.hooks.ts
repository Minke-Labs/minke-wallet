import { useState } from 'react';

const useReferralScreen = () => {
	const [helpModalVisible, setHelpModalVisible] = useState(false);
	const onHelpPress = () => setHelpModalVisible(true);
	const onHelpDismiss = () => setHelpModalVisible(false);

	const [earnModalVisible, setEarnModalVisible] = useState(false);
	const onEarnPress = () => setEarnModalVisible(true);
	const onEarnDismiss = () => setEarnModalVisible(false);

	const [redeemModalVisible, setRedeemModalVisible] = useState(false);
	const onRedeemPress = () => setRedeemModalVisible(true);
	const onRedeemDismiss = () => setRedeemModalVisible(false);

	return {
		helpModalVisible,
		onHelpPress,
		onHelpDismiss,
		earnModalVisible,
		onEarnPress,
		onEarnDismiss,
		redeemModalVisible,
		onRedeemPress,
		onRedeemDismiss
	};
};

export default useReferralScreen;
