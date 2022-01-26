import React from 'react';
import { View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import globalStyles from '@src/components/global.styles';
import { makeStyles } from './styles';
import transationalReceive from './transational-receive.png';
import transationalSent from './transational-sent.png';

const Transactions = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.tabsTransactions}>
			<View style={globalStyles.row}>
				<Text style={styles.transactionDateLabel}>Today</Text>
				<Text style={styles.secondaryText}>Day balance: $00.00</Text>
			</View>

			<View style={styles.transactionDayRow}>
				<View style={(globalStyles.row, styles.transactionItem)}>
					<View style={globalStyles.row}>
						<Image source={transationalSent} style={styles.transationalIcon} />
						<View>
							<Text style={styles.secondaryText}>7h30 pm</Text>
							<Text style={globalStyles.fontSizeDefault}>To marcost.eth</Text>
						</View>
					</View>
					<View style={styles.alignContentRight}>
						<Text style={styles.secondaryText}>0.01 ETH</Text>
						<Text style={globalStyles.fontBold}>-$20.00</Text>
					</View>
				</View>
				<View style={globalStyles.row}>
					<View style={globalStyles.row}>
						<Image source={transationalReceive} style={styles.transationalIcon} />
						<View>
							<Text style={styles.secondaryText}>10h00 pm</Text>
							<Text style={globalStyles.fontSizeDefault}>From minke.eth</Text>
						</View>
					</View>
					<View style={styles.alignContentRight}>
						<Text style={styles.secondaryText}>0.01 ETH</Text>
						<Text style={globalStyles.fontBold}>$20.00</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Transactions;
