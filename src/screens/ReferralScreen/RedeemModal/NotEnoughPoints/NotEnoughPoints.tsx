import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, Share } from 'react-native';
import { Icon, Text } from '@components';
import { useLanguage } from '@hooks';
import { whale4Img } from '@images';
import styles from './NotEnoughPoints.styles';

const NotEnoughPoints = ({ code }: { code: string | undefined }) => {
	const { i18n } = useLanguage();
	const onShare = async () => {
		await Share.share({ message: i18n.t('ReferralScreen.Modals.EarnModal.share_text', { code }) });
	};

	return (
		<SafeAreaView>
			<View>
				<Image source={whale4Img} style={styles.image} />
				<View>
					<Text weight="bold" type="h3" marginBottom={12}>
						{i18n.t('Components.WrongNetwork.NotEnoughPoints.you_dont_have_points')}
					</Text>
					<Text weight="regular" type="a" color="text2" marginBottom={32}>
						{i18n.t('Components.WrongNetwork.NotEnoughPoints.you_can_earn')}
					</Text>
				</View>

				<View style={styles.row}>
					<Text type="p" weight="bold" color="text2">
						{i18n.t('ReferralScreen.Modals.RedeemModal.NotEnoughPoints.referring_a_friend')}
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

				<Text type="a" weight="semiBold" color="text3" marginBottom={24}>
					{i18n.t('ReferralScreen.Modals.EarnModal.when_your_friends_top_up')}
				</Text>
				<View style={styles.row}>
					<Text type="p" weight="bold" color="text2">
						{i18n.t('ReferralScreen.Modals.RedeemModal.NotEnoughPoints.topping_up')}
					</Text>
					<Text type="a" weight="semiBold" color="text2">
						{i18n.t('ReferralScreen.Modals.EarnModal.coming_soon')}
					</Text>
				</View>
				<Text type="a" weight="semiBold" color="text3" marginBottom={32}>
					{i18n.t('ReferralScreen.Modals.EarnModal.get_rewarded')}
				</Text>
				<Text type="tSmall" weight="bold" color="text2">
					{i18n.t('ReferralScreen.Modals.RedeemModal.NotEnoughPoints.what_can_you_do_with_your_points')}
				</Text>
				<Text type="tSmall" weight="regular" color="text2" marginBottom={40}>
					{i18n.t('ReferralScreen.Modals.RedeemModal.NotEnoughPoints.you_can_redeem')}
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default NotEnoughPoints;
