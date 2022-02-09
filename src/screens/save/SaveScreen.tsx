import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PrimaryButton from '@components/PrimaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import { MaterialIcons } from '@expo/vector-icons';
import globalStyle from '@components/global.styles';
import styles from './styles';
import background from './background-rounded-waves.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function SaveScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const goToWalletScreen = () => {
		navigation.navigate('Wallet');
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={background} resizeMode="cover" style={styles.background}>
				<View style={styles.saveCurrentValueContainer}>
					<Text style={[globalStyle.fontSizeDefault, globalStyle.textAlignCenter]}>Current value</Text>
					<Text style={[globalStyle.textAlignCenter, styles.saveCurrentValue]}>$0.00</Text>

					<TouchableOpacity style={[styles.row, styles.depositButton]}>
						<Text>
							<MaterialIcons name="settings" size={20} />
						</Text>
						<Text>Deposit</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>

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
