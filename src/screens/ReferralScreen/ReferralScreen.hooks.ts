import { useWallets } from '@hooks';
import { useState } from 'react';

const useReferralScreen = () => {
	const [helpModalVisible, setHelpModalVisible] = useState(false);
	const onHelpPress = () => setHelpModalVisible(true);
	const onHelpDismiss = () => setHelpModalVisible(false);

	const [earnModalVisible, setEarnModalVisible] = useState(false);
	const onEarnPress = () => setEarnModalVisible(true);
	const onEarnDismiss = () => setEarnModalVisible(false);

	const { wallets } = useWallets();
	const showReferralButton = (Object.values(wallets) || []).length > 0;

	return {
		helpModalVisible,
		onHelpPress,
		onHelpDismiss,
		earnModalVisible,
		onEarnPress,
		onEarnDismiss,
		showReferralButton
	};
};

export default useReferralScreen;
