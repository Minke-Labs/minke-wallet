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
						<Text weight="extraBold" color="text1" marginBottom={8}>
							Save
						</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Icon name="infoStroke" color="cta1" size={24} />
					</TouchableOpacity>
				</View>

				<View style={styles.saveCurrentValueContainer}>
					<Text color="text3" marginBottom={8}>
						Current value
					</Text>
					<Text type="textLarge" weight="medium">
						$0.00
					</Text>
					<TouchableOpacity style={[styles.row, styles.depositButton]}>
						<Icon name="saveStroke" color="cta1" size={20} />
						<Text style={styles.depositButtonText}>Deposit</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>

			<View style={styles.depositCardContainer}>
				<View style={styles.depositCard}>
					<View style={styles.depositCardItem}>
						<View>
							<Text style={styles.depositsAmountLebel}>Earnings</Text>
							<Text style={styles.depositsAmountLebel}>this month</Text>
						</View>
						<Text style={styles.depositsAmount}>$0.00</Text>
					</View>
					<View style={styles.divisor} />
					<View style={styles.depositCardItem}>
						<View>
							<Text style={styles.depositsAmountLebel}>Earnt</Text>
							<Text style={styles.depositsAmountLebel}>since joining</Text>
						</View>
						<Text style={styles.depositsAmount}>$0.00</Text>
					</View>
				</View>

				<View style={styles.actionDepositCard}>
					<View style={styles.actionDepositCardIcon}>
						<Icon name="wallet2Stroke" color="cta1" size={24} />
					</View>
					<View style={styles.actionDepositCardInfo}>
						<Text style={styles.cardInfo}>Your transactions will appear here</Text>
						<Text style={styles.cardCta}>Let's get started?</Text>
					</View>
					<Button iconLeft="addStroke" title="Depoist" marginBottom={16} />
				</View>
			</View>
		</View>
	);
};

export default SaveScreen;
