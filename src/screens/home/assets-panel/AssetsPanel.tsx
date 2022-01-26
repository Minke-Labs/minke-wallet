import React from 'react';
import { View, Image, GestureResponderEvent, useColorScheme } from 'react-native';
import { commify } from 'ethers/lib/utils';
import { Text, Card, useTheme } from 'react-native-paper';
import TextButton from '@components/TextButton';
import makeBlockie from 'ethereum-blockies-base64';
import AddFundsButton from '@components/AddFundsButton';
import { makeStyles } from './styles';

const AssetsPanel = ({
	onSend,
	balance,
	address
}: {
	onSend: (event: GestureResponderEvent) => void;
	balance: string;
	address: string;
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors, useColorScheme());

	return (
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
						onPress={onSend}
						containerStyle={{ flexGrow: 1, flexBasis: 0, justifyContent: 'center' }}
					/>
				</View>
			</Card>
		</View>
	);
};

export default AssetsPanel;
