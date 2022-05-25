import React from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { useTheme, useNavigation, useLanguage, useDepositProtocols } from '@hooks';
import { numberFormat } from '@src/helpers/utilities';
import { Text, Icon, ActivityIndicator, Token } from '@components';
import { BlurView } from 'expo-blur';
import { makeStyles } from './CurrentValue.styles';
import { CurrentValueProps } from './CurrentValue.types';

export const CurrentValue: React.FC<CurrentValueProps> = ({ depositsBalance, apy }) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { colors } = useTheme();
	const scheme = useColorScheme();
	const styles = makeStyles(colors);
	const { selectedProtocol } = useDepositProtocols();

	return (
		<View style={styles.container}>
			<BlurView intensity={12} tint={scheme === 'dark' ? 'dark' : 'light'} style={styles.glassContainer}>
				<Text type="p2" color="text3" marginBottom={8}>
					{i18n.t('SaveScreen.CurrentValue.current_deposits')}
				</Text>
				<Text type="textLarge" weight="medium" marginBottom={14}>
					{numberFormat(depositsBalance, 2)}
				</Text>
				<View style={styles.interestContainer}>
					{!!selectedProtocol && (
						<View style={[styles.infoRow, { marginBottom: 4 }]}>
							<View style={{ marginRight: 4 }}>
								<Token name={selectedProtocol.id} size={24} />
							</View>
							<Text weight="semiBold" type="span">
								{selectedProtocol.name}
							</Text>
						</View>
					)}
					{apy ? (
						<View style={styles.infoRow}>
							<Icon name="iconUp" color="alert3" size={14} style={{ marginRight: 8 }} />
							<Text weight="semiBold" type="a" color="alert3">
								{apy}
								{i18n.t('SaveScreen.interest')}
							</Text>
						</View>
					) : (
						<ActivityIndicator size={16} />
					)}
				</View>
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
