import React from 'react';
import { Image, View } from 'react-native';
import { whale2Img } from '@images';
import { useLanguage } from '@hooks';
import { Button } from '@components';
import Text from '../../Text/Text';
import { styles } from './NoReferralPoints.styles';

const NoReferralPoints = ({ onEarnPress }: { onEarnPress: () => void }) => {
	const { i18n } = useLanguage();
	return (
		<View style={styles.container}>
			<Image source={whale2Img} style={styles.image} />
			<Text type="p2" color="text1" weight="bold" marginBottom={8}>
				{i18n.t('Components.EmptyStates.NoReferralPoints.your_points_will_appear_here')}
			</Text>
			<Text type="p2" color="text1" weight="regular" marginBottom={24}>
				{i18n.t('Components.EmptyStates.NoReferralPoints.lets_get_started')}
			</Text>
			<Button
				title={i18n.t('Components.EmptyStates.NoReferralPoints.earn_points')}
				iconLeft="addStroke"
				onPress={onEarnPress}
			/>
		</View>
	);
};

export default NoReferralPoints;
