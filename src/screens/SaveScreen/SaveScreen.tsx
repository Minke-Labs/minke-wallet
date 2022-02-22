import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Text, Icon, Button } from '@components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { makeStyles } from './SaveScreen.styles';
import background from './background-rounded-waves.png';

const SaveScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<View style={styles.container}>
			<ImageBackground source={background} resizeMode="cover" style={styles.background}>
				<View style={styles.headerNavegation}>
					<TouchableOpacity style={styles.headerNavegationLeft} onPress={() => navigation.goBack()}>
						<Icon name="chevronLeft" color="cta1" size={24} />
						<Text weight="extraBold" color="#0A2138">
							Save
						</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Icon name="infoStroke" color="cta1" size={24} />
					</TouchableOpacity>
				</View>

				<View style={styles.saveCurrentValueContainer}>
					<Text color="#0A2138">Current value</Text>
					<Text color="#0A2138" style={styles.saveCurrentValue}>
						$0.00
					</Text>

					<TouchableOpacity style={[styles.row, styles.depositButton]}>
						<Icon name="saveStroke" color="cta1" size={20} />
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
						<Text style={styles.cardInfo}>Your transactions will appear here</Text>
						<Text style={styles.cardCta}>Let's get started?</Text>
					</View>
					<Button iconLeft="eyeStroke" title="Depoist" marginBottom={16} />
				</View>
			</View>
		</View>
	);
};

export default SaveScreen;
