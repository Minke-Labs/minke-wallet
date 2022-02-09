import React from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '@components/PrimaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import { format } from 'url';
import globalStyle from '@components/global.styles';
import styles from './styles';

export function SaveScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const goToWalletScreen = () => {
		navigation.navigate('Wallet');
	};

	return (
		<View style={styles.container}>
			<View style={styles.saveCurrentValueContainer}>
				<Text style={[globalStyle.fontSizeDefault, globalStyle.textAlignCenter]}>Current value</Text>
				<Text style={[globalStyle.textAlignCenter, styles.saveCurrentValue]}>$0.00</Text>

				<View>
					<Text>icon</Text>
					<Text>Deposit</Text>
				</View>
			</View>

			<View style={styles.depositCardContainer}>
				<View style={styles.depositCard}>
					<View>
						<Text>Deposits since joining</Text>
						<Text>$0.00</Text>
					</View>
					<View>
						<Text>Interest since joining</Text>
						<Text>Deposit</Text>
					</View>
				</View>

				<View style={styles.actionDepositCard}>
					<Text>illustration</Text>
					<View style={styles.actionDepositCardInfo}>
						<Text style={[globalStyle.textAlignCenter, styles.cardInfo]}>
							Your transactions will appear here
						</Text>
						<Text style={[globalStyle.textAlignCenter, globalStyle.fontBold, styles.cardCta]}>
							Let's get started?
						</Text>
					</View>
					<PrimaryButton onPress={goToWalletScreen}>Deposit</PrimaryButton>
				</View>
			</View>
		</View>
	);
}

export default SaveScreen;
