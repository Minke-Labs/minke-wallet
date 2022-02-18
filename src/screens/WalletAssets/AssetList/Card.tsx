import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Token, Icon, Text } from '@components';
import { TokenType } from '@styles';
import { useTheme } from '@hooks';

interface CardProps {
	onPress: () => void;
	coinName: string;
	coinSymbol: TokenType;
	walletBalance: number;
	walletBalanceUsd: number;
	interest: number;
	reward?: number;
}

const Card: React.FC<CardProps> = ({
	onPress,
	coinName,
	coinSymbol,
	walletBalance,
	walletBalanceUsd,
	interest,
	reward
}) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				borderBottomWidth: 1,
				marginTop: 24,
				height: 129,
				borderColor: colors.detail4
			}}
		>
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
					<Token name={coinSymbol as TokenType} size={32} />
					<Text type="a" weight="bold" style={{ marginLeft: 8 }}>
						{coinName}
					</Text>
				</View>
				<TouchableOpacity {...{ onPress }}>
					<Icon name="arrowForwardStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>

			<View style={{ flexDirection: 'row', paddingHorizontal: 24 }}>
				<View style={{ flex: 0.5 }}>
					<Text marginBottom={6} style={{ fontSize: 12, lineHeight: 14 }}>
						Your wallet balance
					</Text>
					<Text marginBottom={2} weight="medium" style={{ fontSize: 16, lineHeight: 19 }}>
						{walletBalance}
					</Text>
					<Text marginBottom={24} style={{ fontSize: 12, lineHeight: 14 }}>
						${walletBalanceUsd}
					</Text>
				</View>
				<View style={{ flex: 0.5 }}>
					<Text marginBottom={6} style={{ fontSize: 12, lineHeight: 14 }}>
						Interest
					</Text>
					<Text marginBottom={2} weight="medium" style={{ fontSize: 16, lineHeight: 19 }}>
						{interest}%
					</Text>
					<Text marginBottom={24} style={{ fontSize: 12, lineHeight: 14 }}>
						{reward && `${reward}% Reward`}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Card;
