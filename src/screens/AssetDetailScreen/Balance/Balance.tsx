import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Paper2, Text } from '@components';
import { useTheme } from '@hooks';

export const Balance = () => {
	const { colors } = useTheme();
	return (
		<Paper2 br={3} style={{ overflow: 'hidden' }} mb={3}>
			<View
				bgc="background2"
				ph={4}
				pv={3}
				style={{
					borderBottomWidth: 1,
					borderBottomColor: colors.background1
				}}
			>
				<Text type="lMedium" weight="semiBold" color="text3">
					Balance
				</Text>
				<Text type="dMedium">
					$1023.0854
				</Text>
			</View>

			<View h={56} row>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => null}
					style={{ flex: 1 }}
				>
					<View
						main="center"
						cross="center"
						style={{
							flex: 1,
							borderRightWidth: 1,
							borderRightColor: colors.background1
						}}
					>
						<Text type="lLarge" color="cta1" weight="semiBold">
							Buy
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => null}
					style={{ flex: 1 }}
				>
					<View
						main="center"
						cross="center"
						style={{
							flex: 1,
							borderRightWidth: 1,
							borderRightColor: colors.background1
						}}
					>
						<Text type="lLarge" color="cta1" weight="semiBold">
							Sell
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => null}
					style={{ flex: 1 }}
				>
					<View
						main="center"
						cross="center"
						style={{ flex: 1 }}
					>
						<Text type="lLarge" color="cta1" weight="semiBold">
							Send
						</Text>
					</View>
				</TouchableOpacity>
			</View>

		</Paper2>
	);
};
