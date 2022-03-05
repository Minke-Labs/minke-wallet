import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Icon } from '@components';
import { commify } from 'ethers/lib/utils';
import makeBlockie from 'ethereum-blockies-base64';
import { useTheme } from '@hooks';
import styles from './styles';
import { AssetsPanelProps } from './types';

const AssetsPanel: React.FC<AssetsPanelProps> = ({ balance, address, onAddFunds, onSave, onWalletAssets }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.assetsContainer}>
			<TouchableOpacity
				style={[styles.assetsMain, { backgroundColor: colors.background2 }]}
				onPress={onWalletAssets}
			>
				<View>
					<Text type="a" marginBottom={8}>
						Your total assets
					</Text>
					<Text type="h1" weight="medium">
						${commify(balance)}
					</Text>
				</View>
				<View>{address ? <Image source={{ uri: makeBlockie(address) }} style={styles.avatar} /> : null}</View>
			</TouchableOpacity>
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
					onPress={onSave}
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
