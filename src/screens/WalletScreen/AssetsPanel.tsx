import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon, Token } from '@components';

const styles = StyleSheet.create({
	assetsContainer: {
		width: '100%',
		height: 161,
		borderRadius: 24,
		overflow: 'hidden',
		marginBottom: 16
	},
	assetsMain: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 17,
		backgroundColor: '#FFFCF5'
	},
	buttonsContainer: {
		flexDirection: 'row',
		height: 53
	},
	addFundsButtonContainer: {
		backgroundColor: '#fff',
		width: '50%',
		borderRightColor: '#F2EAE1',
		borderRightWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	sendButtonContainer: {
		backgroundColor: '#fff',
		width: '50%',
		borderLeftColor: '#F2EAE1',
		borderLeftWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

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
