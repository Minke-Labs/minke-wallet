import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, Icon, Token, Input } from '@components';
import { TokenType } from '@styles';
import { TokenCardProps } from './TokenCard.types';
import { useTokenCard } from './TokenCard.hooks';

const TokenCard: React.FC<TokenCardProps> = ({
	token,
	onPress,
	balance,
	innerRef,
	disableMax = false,
	updateQuotes,
	conversionAmount = ''
}) => {
	const { amount, onChangeText, onMaxPress, isMaxEnabled, invalidAmount, styles } = useTokenCard({
		balance,
		updateQuotes: updateQuotes!,
		token: token!,
		conversionAmount,
		disableMax
	});

	if (!token) {
		return (
			<TouchableOpacity onPress={onPress}>
				<View style={styles.tokenCardWrap}>
					<View style={styles.tokenCardCoinContent}>
						<View style={styles.selectTokenRow}>
							<View style={styles.currencyIcon}>
								<Icon name="dollarStroke" color="cta1" size={32} />
							</View>
							<Text type="p2">Choose token</Text>
							<Icon name="chevronRight" color="cta1" size={16} />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.tokenCardWrap}>
			<View style={styles.tokenCardCoinContent}>
				<TouchableOpacity onPress={onPress}>
					<View style={styles.tokenCardCoin}>
						<View style={styles.tokenImageContainer}>
							<Token name={(token.symbol || '').toLowerCase() as TokenType} size={34} glow />
						</View>
						<Text type="p2" style={styles.tokenName} weight="extraBold">
							{token.symbol}
						</Text>
						<Icon name="chevronRight" color="cta1" size={16} />
					</View>
				</TouchableOpacity>
				<Input
					keyboardType="numeric"
					style={{ flex: 1 }}
					error={invalidAmount as boolean}
					value={amount}
					ref={innerRef}
					onChangeText={(text) => onChangeText(text)}
					small
				/>
			</View>
			{isMaxEnabled && (
				<View style={styles.tokenCardMaxButtonContent}>
					<TouchableOpacity onPress={onMaxPress} style={styles.tokenCardMaxButton}>
						<Icon name="sparkleStroke" size={16} color="cta1" />
						<Text type="a" color="cta1" style={styles.tokenCardMaxButtonText}>
							Max
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default TokenCard;