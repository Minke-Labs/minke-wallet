/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import { View, Image, useColorScheme } from 'react-native';
// import { View, Image, GestureResponderEvent, useColorScheme } from 'react-native';
import { commify } from 'ethers/lib/utils';
import { Text, Card, useTheme } from 'react-native-paper';
import TextButton from 'old/src/components/TextButton';
import makeBlockie from 'ethereum-blockies-base64';
import AddFundsButton from 'old/src/components/AddFundsButton';
import SendModal from 'old/src/components/SendModal/SendModal';
import { makeStyles } from './styles';

interface AssetsPanelProps {
	balance: string;
	address: string;
	// onSend: (event: GestureResponderEvent) => void;
}

const AssetsPanel: React.FC<AssetsPanelProps> = ({ balance, address }) => {
	const [sendModalOpen, setSendModalOpen] = useState(false);
	const { colors } = useTheme();
	const styles = makeStyles(colors, useColorScheme());

	return (
		<>
			<View style={styles.paddingContent}>
				<Card style={styles.card}>
					<View style={styles.cardTopContent}>
						<View>
							<Text style={styles.cardLabel}>Your total assets</Text>
							<Text style={styles.cardBalance}>${commify(balance)}</Text>
						</View>
						<View>
							{address ? <Image source={{ uri: makeBlockie(address) }} style={styles.avatar} /> : null}
						</View>
					</View>
					<View style={styles.cardBottomContent}>
						<AddFundsButton
							button={
							// eslint-disable-next-line react/jsx-wrap-multilines
								<TextButton
									text="Add funds"
									icon="add-circle-outline"
									containerStyle={styles.cardDivisor}
								/>
						}
						/>
						<TextButton
							text="Send"
							icon="arrow-circle-up"
							// onPress={onSend}
							onPress={() => setSendModalOpen(true)}
							containerStyle={{ flexGrow: 1, flexBasis: 0, justifyContent: 'center' }}
						/>
					</View>
				</Card>
			</View>
			<SendModal
				visible={sendModalOpen}
				onDismiss={() => setSendModalOpen(false)}
				onCloseAll={() => setSendModalOpen(false)}
				// onBack={() => console.log('BACK')}
			/>
		</>
	);
};

export default AssetsPanel;
