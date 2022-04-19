import React from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { useTheme, useNavigation } from '@hooks';
import { tokenBalanceFormat } from '@src/helpers/utilities';
import { Text, Icon } from '@components';
import { BlurView } from 'expo-blur';
import { makeStyles } from './CurrentValue.styles';
import { CurrentValueProps } from './CurrentValue.types';

export const CurrentValue: React.FC<CurrentValueProps> = ({ depositsBalance, aaveMarket }) => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const scheme = useColorScheme();
	const styles = makeStyles(colors);

	return (
		<View style={styles.container}>
			<BlurView intensity={12} tint={scheme === 'dark' ? 'dark' : 'light'} style={styles.glassContainer}>
				<Text type="p2" color="text3" marginBottom={8}>
					Current deposits
				</Text>
				<Text type="textLarge" weight="medium" marginBottom={14}>
					${tokenBalanceFormat(depositsBalance, 2)}
				</Text>
				{aaveMarket && (
					<View style={styles.interestContainer}>
						<Icon name="iconUp" color="alert3" size={14} style={{ marginRight: 8 }} />
						<Text weight="medium" type="a" color="alert3">
							{(aaveMarket.supplyApy * 100).toFixed(2)}% interest p.a.
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
						Withdraw
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.depositButton} onPress={() => navigation.navigate('DepositScreen')}>
					<Icon name="saveStroke" color="cta1" size={20} />
					<Text marginBottom={4} style={{ marginLeft: 8 }}>
						Deposit
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
