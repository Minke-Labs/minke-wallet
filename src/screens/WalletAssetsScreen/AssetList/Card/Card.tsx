import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Token, Icon, Text } from '@components';
import { TokenType } from '@styles';
import { numberFormat, tokenBalanceFormat } from '@helpers/utilities';
import { useTheme, useLanguage } from '@hooks';
import { CardProps } from './Card.types';
import styles from './Card.styles';

const Card: React.FC<CardProps> = ({ onPress, coinName, coinSymbol, walletBalance, walletBalanceUsd, interest }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { borderColor: colors.detail4 }]}>
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<Token name={coinSymbol.toLowerCase() as TokenType} glow size={32} />
					<Text type="a" weight="bold" style={{ marginLeft: 8 }}>
						{coinName}
					</Text>
				</View>
				<TouchableOpacity {...{ onPress }}>
					<Icon name="arrowForwardStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>

			<View style={styles.body}>
				<View style={{ flex: 0.5 }}>
					<Text marginBottom={6} type="span">
						{i18n.t('WalletAssetsScreen.Card.your_wallet_balance')}
					</Text>
					<Text marginBottom={2} weight="medium" type="p2">
						{tokenBalanceFormat(walletBalance, 10)} <Text type="span">{coinSymbol}</Text>
					</Text>
					<Text marginBottom={24} type="span">
						{numberFormat(walletBalanceUsd)}
					</Text>
				</View>
				{interest && (
					<View style={{ flex: 0.5 }}>
						<Text marginBottom={2} weight="medium" type="p2">
							{interest}% APY
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export default Card;
