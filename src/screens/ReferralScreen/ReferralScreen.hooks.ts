import { useState } from 'react';

const useReferralScreen = () => {
	const [helpModalVisible, setHelpModalVisible] = useState(false);
	const onHelpPress = () => setHelpModalVisible(true);
	const onHelpDismiss = () => setHelpModalVisible(false);

	const [earnModalVisible, setEarnModalVisible] = useState(false);
	const onEarnPress = () => setEarnModalVisible(true);
	const onEarnDismiss = () => setEarnModalVisible(false);

	return {
		helpModalVisible,
		onHelpPress,
		onHelpDismiss,
		earnModalVisible,
		onEarnPress,
		onEarnDismiss
	};
};

export default useReferralScreen;
