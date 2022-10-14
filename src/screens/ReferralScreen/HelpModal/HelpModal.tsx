import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { ModalHeader, Text } from '@components';
import { whale3Img } from '@images';
import { useLanguage } from '@hooks';
import styles from './HelpModal.styles';

const HelpModal = ({ onDismiss }: { onDismiss: () => void }) => {
	const { i18n } = useLanguage();
	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.container}>
				<Image source={whale3Img} style={styles.image} />
				<Text type="p" weight="bold" style={{ width: '100%' }} marginBottom={16}>
					{i18n.t('ReferralScreen.Modals.HelpModal.how_minke_points_work')}
				</Text>
				<Text type="p2" color="text2" style={{ width: '100%' }} marginBottom={24}>
					{i18n.t('ReferralScreen.Modals.HelpModal.rewards_explanation')}
				</Text>
				<Text type="p2" weight="bold" style={{ width: '100%' }} marginBottom={16}>
					{i18n.t('ReferralScreen.Modals.HelpModal.you_can_earn_points_by')}
				</Text>
				<Text type="p2" color="text2" style={{ width: '100%' }} marginBottom={4}>
					{i18n.t('ReferralScreen.Modals.HelpModal.topping_up_for_the_first_time')}
				</Text>
				<Text type="p2" color="text2" style={{ width: '100%' }} marginBottom={24}>
					{i18n.t('ReferralScreen.Modals.HelpModal.refering_minke')}
				</Text>
				<Text type="p2" weight="bold" style={{ width: '100%' }} marginBottom={16}>
					{i18n.t('ReferralScreen.Modals.HelpModal.what_can_you_do')}
				</Text>
				<Text type="p2" color="text2" style={{ width: '100%' }} marginBottom={40}>
					{i18n.t('ReferralScreen.Modals.HelpModal.you_can_redeem_your_points')}
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default HelpModal;
