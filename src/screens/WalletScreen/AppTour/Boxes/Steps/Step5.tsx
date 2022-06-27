import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@components';
import { AppTourContext } from '../../index';

const Button: React.FC<{ onPress: () => void }> = ({ onPress }) => (
	<TouchableOpacity
		style={{
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'center'
		}}
		onPress={onPress}
	>
		<Text
			type="a" // TODO: Change to lMedium after merge.
			weight="semiBold"
			color="cta1"
			style={{ marginRight: 8 }}
		>
			Finish
		</Text>
		<Icon name="checkmark" size={20} color="cta1" />
	</TouchableOpacity>
);

export const Step5 = () => {
	const { dismiss } = useContext(AppTourContext);
	return (
		<>
			<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
				<Icon
					name="sendStroke"
					size={20}
					color="cta1"
					style={{ marginRight: 8 }}
				/>
				<Text
					type="p" // Change to tMedium after new values come from merge.
					weight="bold"
				>
					Send
				</Text>
			</View>
			<Text width={237} type="a" marginBottom={16}>
				Send tokens to a another wallet or to an exchange like Binance or Coinbase.
			</Text>

			<View style={{ height: 25, flexDirection: 'row' }}>
				<Icon
					name="exchangeStroke"
					size={20}
					color="cta1"
					style={{ marginRight: 8 }}
				/>
				<Text
					type="p" // Change to tMedium after new values come from merge.
					weight="bold"
				>
					Exchange
				</Text>
			</View>
			<Text width={237} type="a" marginBottom={16}>
				Swap between tokens.
			</Text>

			<View style={{ height: 25, flexDirection: 'row' }}>
				<Icon
					name="receiveStroke"
					size={20}
					color="cta1"
					style={{ marginRight: 8 }}
				/>
				<Text
					type="p" // Change to tMedium after new values come from merge.
					weight="bold"
				>
					Receive
				</Text>
			</View>
			<Text width={237} type="a">
				Copy your public address or use a QR code.
			</Text>

			<Button onPress={dismiss} />
		</>
	);
};
