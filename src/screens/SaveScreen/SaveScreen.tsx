import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Text, Icon, Button } from '@components';
import { useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { makeStyles } from './SaveScreen.styles';
import background from './background-rounded-waves.png';

const SaveScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<View style={styles.container}>
			<ImageBackground source={background} resizeMode="cover" style={styles.background}>
				<View style={styles.headerNavegation}>
					<View style={styles.headerNavegationLeft}>
						<Icon name="eyeStroke" size={20} />
						<Text type="h3">Save</Text>
					</View>
					<TouchableOpacity>
						<Icon name="eyeStroke" color="cta1" size={24} />
					</TouchableOpacity>
				</View>

				<View style={styles.saveCurrentValueContainer}>
					<Text>Current value</Text>
					<Text style={styles.saveCurrentValue}>$0.00</Text>

					<TouchableOpacity style={[styles.row, styles.depositButton]}>
						<Icon name="eyeStroke" color="cta1" size={20} />
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
