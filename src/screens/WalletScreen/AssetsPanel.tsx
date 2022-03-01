import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, GestureResponderEvent } from 'react-native';
import { Text, Icon } from '@components';
import { commify } from 'ethers/lib/utils';
import makeBlockie from 'ethereum-blockies-base64';
import { useNavigation, useTheme } from '@hooks';

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
		paddingBottom: 17
	},
	buttonsContainer: {
		flexDirection: 'row',
		height: 53,
		borderTopWidth: 1
	},
	addFundsButtonContainer: {
		width: '50%',
		borderRightWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	sendButtonContainer: {
		width: '50%',
		borderLeftWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderColor: 'rgba(243, 247, 255, 1)',
		borderWidth: 4
	}
});

interface AssetsPanelProps {
	balance: string;
	address: string;
	onSave: (event: GestureResponderEvent) => void;
	onAddFunds: (event: GestureResponderEvent) => void;
}

const AssetsPanel: React.FC<AssetsPanelProps> = ({ balance, address, onAddFunds, onSave }) => {
	const { colors } = useTheme();
	const navigation = useNavigation();

	return (
		<View style={styles.assetsContainer}>
			<View style={[styles.assetsMain, { backgroundColor: colors.background2 }]}>
				<View>
					<Text type="a" marginBottom={8}>
						Your total assets
					</Text>
					<Text type="h1" weight="medium">
						${commify(balance)}
					</Text>
				</View>
				<View>{address ? <Image source={{ uri: makeBlockie(address) }} style={styles.avatar} /> : null}</View>
			</View>
			<View style={[styles.buttonsContainer, { borderTopColor: colors.background1 }]}>
				<TouchableOpacity
					onPress={onAddFunds}
					activeOpacity={0.6}
					style={[
						styles.addFundsButtonContainer,
						{ backgroundColor: colors.background2, borderRightColor: colors.background1 }
					]}
				>
					<Icon name="addStroke" color="cta1" size={20} style={{ marginRight: 8 }} />
					<Text type="a">Add Funds</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('Save')}
					activeOpacity={0.6}
					style={[
						styles.sendButtonContainer,
						{ backgroundColor: colors.background2, borderLeftColor: colors.background1 }
					]}
				>
					<Icon name="saveStroke" color="cta1" size={20} style={{ marginRight: 8 }} />
					<Text type="a">Save</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default AssetsPanel;
