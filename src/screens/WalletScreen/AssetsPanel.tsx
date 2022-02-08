import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, Token } from '@components';
import styles from './WalletScreen.styles';

const AssetsPanel = () => (
	<View style={styles.assetsContainer}>
		<View style={styles.assetsMain}>
			<View>
				<Text type="a" marginBottom={8}>
					Your total assets
				</Text>
				<Text type="h1" weight="medium">
					$200.00
				</Text>
			</View>
			<Token size={48} />
		</View>
		<View style={styles.buttonsContainer}>
			<TouchableOpacity activeOpacity={0.6} style={styles.addFundsButtonContainer}>
				<Icon name="addStroke" color="cta1" size={20} style={{ marginRight: 8 }} />
				<Text type="a">Add Funds</Text>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.6} style={styles.sendButtonContainer}>
				<Text type="a" style={{ marginRight: 8 }}>
					Send
				</Text>
				<Icon name="sendStroke" color="cta1" size={20} />
			</TouchableOpacity>
		</View>
	</View>
);

export default AssetsPanel;
