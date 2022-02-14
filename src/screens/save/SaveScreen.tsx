import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PrimaryButton from '@components/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import globalStyle from '@components/global.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { makeStyles } from './styles';
import background from './background-rounded-waves.png';

export function SaveScreen() {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<View style={styles.container}>
			<ImageBackground source={background} resizeMode="cover" style={styles.background}>
				<View style={styles.headerNavegation}>
					<View style={styles.headerNavegationLeft}>
						<MaterialIcons name="arrow-back-ios" color={colors.secondaryText} size={20} />
						<Text style={[globalStyle.headline, styles.headerNavegationTitle]}>Save</Text>
					</View>
					<TouchableOpacity>
						<MaterialIcons name="info-outline" color={colors.primary} size={24} />
					</TouchableOpacity>
				</View>

				<View style={styles.saveCurrentValueContainer}>
					<Text style={[globalStyle.fontSizeDefault, globalStyle.textAlignCenter]}>Current value</Text>
					<Text style={[globalStyle.textAlignCenter, styles.saveCurrentValue]}>$0.00</Text>

					<TouchableOpacity style={[styles.row, styles.depositButton]}>
						<MaterialIcons name="attach-money" color={colors.secondaryText} size={20} />
						<Text>Deposit</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>

			<View style={styles.depositCardContainer}>
				<View style={styles.depositCard}>
					<View style={styles.depositCardItem}>
						<View>
							<Text style={styles.depositsAmountLebel}>Deposits</Text>
							<Text style={styles.depositsAmountLebel}>since joining</Text>
						</View>
						<Text style={styles.depositsAmount}>$0.00</Text>
					</View>
					<View style={styles.divisor} />
					<View style={styles.depositCardItem}>
						<View>
							<Text style={styles.depositsAmountLebel}>Interest</Text>
							<Text style={styles.depositsAmountLebel}>since joining</Text>
						</View>
						<Text style={styles.depositsAmount}>$0.00</Text>
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
					<PrimaryButton>Deposit</PrimaryButton>
				</View>
			</View>
		</View>
	);
}

export default SaveScreen;
