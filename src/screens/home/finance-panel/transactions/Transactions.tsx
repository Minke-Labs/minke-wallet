import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import transationalReceive from './transational-receive.png';
import transationalSent from './transational-sent.png';

const Transactions = () => (
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
						<Text style={styles.fontSizeDefault}>To jreys.eth</Text>
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
						<Text style={styles.fontSizeDefault}>From jreys.eth</Text>
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

export default Transactions;
