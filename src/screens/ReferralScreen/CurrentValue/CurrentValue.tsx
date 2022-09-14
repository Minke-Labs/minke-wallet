import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { Text, Icon, View } from '@components';
import { BlurView } from 'expo-blur';
import { REFERRAL_POINTS_TO_USD_CONVERSION } from '@helpers/utilities';
import { makeStyles } from './CurrentValue.styles';

export const CurrentValue = ({
	onEarnPress,
	onRedeemPress,
	points
}: {
	onEarnPress: () => void;
	onRedeemPress: () => void;
	points: number;
}) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const scheme = useColorScheme();
	const styles = makeStyles(colors);

	return (
		<View
			mt="m"
			br="s"
			style={{ overflow: 'hidden' }}
		>
			<BlurView intensity={12} tint={scheme === 'dark' ? 'dark' : 'light'} style={styles.glassContainer}>
				<Text type="p2" color="text3" weight="bold" mb="xxs">
					{i18n.t('ReferralScreen.CurrentValue.owned')}
				</Text>
				<Text type="textLarge" weight="medium" mb="xs">
					{points} {i18n.t('ReferralScreen.CurrentValue.pts')}
				</Text>
				<View
					cross="center"
					pv="xxxs"
					ph="xxs"
					br="xxs"
					mb="xs"
				>
					<View
						row
						mb="xxxs"
						main="center"
						cross="center"
					>
						<Text type="a" color="text4">
							${points * REFERRAL_POINTS_TO_USD_CONVERSION}
						</Text>
					</View>
				</View>
			</BlurView>
			<View row>
				<TouchableOpacity
					style={[styles.depositButton, { borderRightColor: colors.background2, borderRightWidth: 2 }]}
					onPress={onRedeemPress}
				>
					<Icon name="minusStroke" color="cta1" size={20} />
					<View mr="xxxs" />
					<Text mb="xxxs">
						{i18n.t('ReferralScreen.CurrentValue.redeem')}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.depositButton} onPress={onEarnPress}>
					<Icon name="save" color="cta1" size={20} />
					<View mr="xxxs" />
					<Text mb="xxxs">
						{i18n.t('ReferralScreen.CurrentValue.earn')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
