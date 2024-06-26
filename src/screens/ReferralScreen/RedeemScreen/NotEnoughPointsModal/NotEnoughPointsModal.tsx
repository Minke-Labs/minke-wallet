import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, Share } from 'react-native';
import { Icon, ModalHeader, Text } from '@components';
import { useLanguage } from '@hooks';
import { whale4Img } from '@images';
import styles from './NotEnoughPointsModal.styles';

const NotEnoughPointsModal = ({ code, onDismiss }: { code: string | undefined; onDismiss: () => void }) => {
	const { i18n } = useLanguage();
	const onShare = async () => {
		await Share.share({ message: i18n.t('ReferralScreen.Modals.EarnModal.share_text', { code }) });
	};

	return (
		<SafeAreaView>
			<ModalHeader onDismiss={onDismiss} />
			<View style={styles.container}>
				<Image source={whale4Img} style={styles.image} />
				<Text weight="bold" type="h3" marginBottom={12}>
					{i18n.t('ReferralScreen.RedeemScreen.Modals.NotEnoughPoints.you_dont_have_points')}
				</Text>
				<Text weight="regular" type="a" color="text2" marginBottom={32}>
					{i18n.t('ReferralScreen.RedeemScreen.Modals.NotEnoughPoints.you_can_earn')}
				</Text>

				<View style={styles.row}>
					<Text type="p" weight="bold" color="text2">
						{i18n.t('ReferralScreen.RedeemScreen.Modals.NotEnoughPoints.referring_a_friend')}
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

				<Text type="bMedium" weight="regular" color="text3" marginBottom={16}>
					{i18n.t('ReferralScreen.Modals.EarnModal.when_your_friends_top_up')}
				</Text>
				<Text type="bMedium" weight="regular" color="text3" marginBottom={32}>
					{i18n.t('ReferralScreen.Modals.EarnModal.points_are_distributed')}
				</Text>
				<Text type="tSmall" weight="bold" color="text2" marginBottom={16}>
					{i18n.t('ReferralScreen.RedeemScreen.Modals.NotEnoughPoints.what_can_you_do_with_your_points')}
				</Text>
				<Text type="bMedium" weight="regular" color="text3" marginBottom={12}>
					{i18n.t('ReferralScreen.RedeemScreen.Modals.NotEnoughPoints.you_can_redeem')}
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default NotEnoughPointsModal;
