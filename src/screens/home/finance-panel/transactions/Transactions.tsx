import React from 'react';
import { View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { makeStyles } from './styles';
import transationalReceive from './transational-receive.png';
import transationalSent from './transational-sent.png';

const Transactions = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.tabsTransactions}>
			<View style={styles.row}>
				<Text style={styles.transactionDateLabel}>Today</Text>
				<Text style={styles.fontSizeSmall}>Day balance: $00.00</Text>
			</View>

			<View style={styles.transactionDayRow}>
				<View style={(styles.row, styles.transactionItem)}>
					<View style={styles.row}>
						<Image source={transationalSent} style={styles.transationalIcon} />
						<View>
							<Text style={styles.fontSizeSmall}>7h30 pm</Text>
							<Text style={styles.fontSizeDefault}>To marcost.eth</Text>
						</View>
					</View>
					<View style={styles.alignContentRight}>
						<Text style={styles.fontSizeSmall}>0.01 ETH</Text>
						<Text style={styles.fontBold}>-$20.00</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.row}>
						<Image source={transationalReceive} style={styles.transationalIcon} />
						<View>
							<Text style={styles.fontSizeSmall}>10h00 pm</Text>
							<Text style={styles.fontSizeDefault}>From minke.eth</Text>
						</View>
					</View>
					<View style={styles.alignContentRight}>
						<Text style={styles.fontSizeSmall}>0.01 ETH</Text>
						<Text style={styles.fontBold}>$20.00</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Transactions;
