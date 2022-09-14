import React from 'react';
import { Image } from 'react-native';
import { whale2Img } from '@images';
import { useLanguage, useNavigation } from '@hooks';
import Button from '@src/components/Button/Button';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';

const NoReferralPoints = ({ onEarnPress }: { onEarnPress: () => void }) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	return (
		<View cross="center" pt="m">
			<Image
				source={whale2Img}
				style={{ width: 152, height: 152 }}
			/>
			<Text type="tSmall" weight="bold" mb="xxs">
				{i18n.t('Components.EmptyStates.NoReferralPoints.your_points_will_appear_here')}
			</Text>
			<Text type="bMedium" mb="l">
				{i18n.t('Components.EmptyStates.NoReferralPoints.lets_get_started')}
			</Text>
			<Button
				title={i18n.t('Components.EmptyStates.NoReferralPoints.earn_points')}
				iconLeft="add"
				onPress={onEarnPress}
			/>
			<View mb="xxxs" />
			<Button
				title="I have a referral code"
				mode="empty"
				onPress={() => navigation.navigate('EnterReferralCodeScreen')}
			/>
		</View>
	);
};

export default NoReferralPoints;
