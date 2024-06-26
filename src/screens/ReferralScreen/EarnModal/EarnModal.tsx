import React from 'react';
import { SafeAreaView, TouchableOpacity, View, Share } from 'react-native';
import { Icon, ModalHeader, Text } from '@components';
import { useLanguage } from '@hooks';
import styles from './EarnModal.styles';

const EarnModal = ({ onDismiss, code }: { onDismiss: () => void; code: string | undefined }) => {
	const { i18n } = useLanguage();
	const onShare = async () => {
		await Share.share({ message: i18n.t('ReferralScreen.Modals.EarnModal.share_text', { code }) });
	};

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.container}>
				<Text type="h3" weight="bold" style={{ width: '100%' }} marginBottom={32}>
					{i18n.t('ReferralScreen.Modals.EarnModal.earn_minke_points')}
				</Text>
				<View style={styles.row}>
					<Text type="p" weight="bold" color="text2">
						{i18n.t('ReferralScreen.Modals.EarnModal.refer_a_friend')}
					</Text>
					{!!code && (
						<TouchableOpacity
							onPress={onShare}
							style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
						>
							<Text type="p" weight="bold" color="cta1">
								{code}
							</Text>
							<Icon name="shareStroke" color="cta1" size={18} />
						</TouchableOpacity>
					)}
				</View>
				<Text type="a" weight="semiBold" color="text3" style={{ width: '100%' }} marginBottom={24}>
					{i18n.t('ReferralScreen.Modals.EarnModal.when_your_friends_top_up')}
				</Text>
				<Text type="a" weight="semiBold" color="text3" style={{ width: '100%' }} marginBottom={40}>
					{i18n.t('ReferralScreen.Modals.EarnModal.points_are_distributed')}
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default EarnModal;
