import React from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { Text, Icon } from '@components';
import { BlurView } from 'expo-blur';
import { makeStyles } from './CurrentValue.styles';

export const CurrentValue = ({
	onEarnPress,
	onRedeemPress
}: {
	onEarnPress: () => void;
	onRedeemPress: () => void;
}) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const scheme = useColorScheme();
	const styles = makeStyles(colors);

	return (
		<View style={styles.container}>
			<BlurView intensity={12} tint={scheme === 'dark' ? 'dark' : 'light'} style={styles.glassContainer}>
				<Text type="p2" color="text3" weight="bold" marginBottom={8}>
					{i18n.t('ReferralScreen.CurrentValue.owned')}
				</Text>
				<Text type="textLarge" weight="medium" marginBottom={14}>
					100 {i18n.t('ReferralScreen.CurrentValue.pts')}
				</Text>
				<View style={styles.interestContainer}>
					<View style={[styles.infoRow, { marginBottom: 4 }]}>
						<Text type="a" color="text4">
							$5.00
						</Text>
					</View>
				</View>
			</BlurView>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<TouchableOpacity
					style={[styles.depositButton, { borderRightColor: colors.background2, borderRightWidth: 2 }]}
					onPress={onRedeemPress}
				>
					<Icon name="minusStroke" color="cta1" size={20} />
					<Text marginBottom={4} style={{ marginLeft: 8 }}>
						{i18n.t('ReferralScreen.CurrentValue.redeem')}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.depositButton} onPress={onEarnPress}>
					<Icon name="saveStroke" color="cta1" size={20} />
					<Text marginBottom={4} style={{ marginLeft: 8 }}>
						{i18n.t('ReferralScreen.CurrentValue.earn')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
