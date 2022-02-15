/* eslint-disable no-console */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Token, Icon, Text } from '@components';

const Card = () => (
	<View style={{ borderBottomWidth: 1, marginTop: 24, borderColor: '#fff', height: 129 }}>
		<View
			style={{
				height: 32,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: 24,
				marginBottom: 16
			}}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Token name="eth" size={32} />
				<Text type="a" weight="bold" style={{ marginLeft: 8 }}>
					Ethereum
				</Text>
			</View>
			<TouchableOpacity onPress={() => console.log('GO!')}>
				<Icon name="arrowForwardStroke" color="text7" size={24} />
			</TouchableOpacity>
		</View>

		<View style={{ flexDirection: 'row', paddingHorizontal: 24 }}>
			<View style={{ flex: 0.5 }}>
				<Text marginBottom={6} style={{ fontSize: 12, lineHeight: 14 }}>
					Your wallet balance
				</Text>
				<Text marginBottom={2} weight="medium" style={{ fontSize: 16, lineHeight: 19 }}>
					4.08543
				</Text>
				<Text marginBottom={24} style={{ fontSize: 12, lineHeight: 14 }}>
					$15,058.76106
				</Text>
			</View>
			<View style={{ flex: 0.5 }}>
				<Text marginBottom={6} style={{ fontSize: 12, lineHeight: 14 }}>
					Interest
				</Text>
				<Text marginBottom={2} weight="medium" style={{ fontSize: 16, lineHeight: 19 }}>
					0.00%
				</Text>
				<Text marginBottom={24} style={{ fontSize: 12, lineHeight: 14 }}>
					0.25% Reward
				</Text>
			</View>
		</View>
	</View>
);

export default Card;
