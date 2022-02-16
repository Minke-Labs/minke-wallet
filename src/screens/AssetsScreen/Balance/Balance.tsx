/* eslint-disable no-console */
import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import Buttons from './Buttons';

const Balance = () => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				width: '100%',
				height: 146,
				borderRadius: 16,
				marginBottom: 16,
				overflow: 'hidden',

				backgroundColor: colors.background2
			}}
		>
			<View
				style={{
					flex: 1,
					paddingTop: 16,
					paddingLeft: 24,
					paddingRight: 12
				}}
			>
				<View
					style={{
						borderWidth: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginBottom: 8
					}}
				>
					<Text>Balance</Text>
				</View>
				<Text
					style={{
						fontSize: 32,
						lineHeight: 39
					}}
				>
					$200.00
				</Text>
			</View>

			<Buttons onPress={() => console.log('PRESSED!')} />
		</View>
	);
};

export default Balance;
