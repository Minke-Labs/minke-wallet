import React from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { useTheme, useNavigation, useLanguage } from '@hooks';
import { numberFormat } from '@src/helpers/utilities';
import { Text, Icon } from '@components';
import { BlurView } from 'expo-blur';
import { makeStyles } from './CurrentValue.styles';
import { CurrentValueProps } from './CurrentValue.types';

export const CurrentValue: React.FC<CurrentValueProps> = ({ depositsBalance, apy }) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { colors } = useTheme();
	const scheme = useColorScheme();
	const styles = makeStyles(colors);

	return (
		<View style={styles.container}>
			<BlurView intensity={12} tint={scheme === 'dark' ? 'dark' : 'light'} style={styles.glassContainer}>
				<Text type="p2" color="text3" marginBottom={8}>
					{i18n.t('SaveScreen.CurrentValue.current_deposits')}
				</Text>
				<Text type="textLarge" weight="medium" marginBottom={14}>
					{numberFormat(depositsBalance, 2)}
				</Text>
				{apy && (
					<View style={styles.interestContainer}>
						<Icon name="iconUp" color="alert3" size={14} style={{ marginRight: 8 }} />
						<Text weight="medium" type="a" color="alert3">
							{apy}
							{i18n.t('SaveScreen.interest')}
						</Text>
					</View>
				)}
			</BlurView>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<TouchableOpacity
					style={[styles.depositButton, { borderRightColor: colors.background2, borderRightWidth: 2 }]}
					onPress={() => navigation.navigate('WithdrawScreen')}
				>
					<Icon name="minusStroke" color="cta1" size={20} />
					<Text marginBottom={4} style={{ marginLeft: 8 }}>
						{i18n.t('SaveScreen.CurrentValue.withdraw')}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.depositButton} onPress={() => navigation.navigate('DepositScreen')}>
					<Icon name="saveStroke" color="cta1" size={20} />
					<Text marginBottom={4} style={{ marginLeft: 8 }}>
						{i18n.t('SaveScreen.CurrentValue.deposit')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
