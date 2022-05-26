import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TokenType } from '@styles';
import { useTheme, useLanguage, useTokens } from '@hooks';
import { tokenBalanceFormat, numberFormat } from '@helpers/utilities';
import { TokenCardProps } from './TokenCard.types';
import { useTokenCard } from './TokenCard.hooks';
import { makeStyles } from './TokenCard.styles';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Token from '../Token/Token';
import TokenInputInner from '../TokenInputInner/TokenInputInner';
import { InterestTag } from './InterestTag/InterestTag';

const TokenCard: React.FC<TokenCardProps> = ({
	token,
	onPress,
	balance,
	disableMax = false,
	updateQuotes,
	conversionAmount = '',
	notTouchable = false,
	apy,
	tokenBalance
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { i18n } = useLanguage();
	const { tokens } = useTokens();
	const { amount, onChangeText, onMaxPress, isMaxEnabled, invalidAmount } = useTokenCard({
		balance,
		updateQuotes: updateQuotes!,
		token: token!,
		conversionAmount,
		disableMax
	});

	const getBalanceUSD = () => numberFormat(tokens?.filter((item) => item.symbol === token?.symbol)[0].balanceUSD);

	if (!token) {
		return (
			<TouchableOpacity {...{ onPress }} activeOpacity={notTouchable ? 1 : 0.6}>
				<View style={styles.container}>
					<View style={styles.coinSelector}>
						<View style={styles.selectTokenRow}>
							<View style={styles.currencyIcon}>
								<Icon name="dollarStroke" color="cta1" size={32} />
							</View>
							<Text type="p2">
								{i18n.t('Components.TokenCard.choose_token')}
							</Text>
							<Icon name="chevronRight" color="cta1" size={16} />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.container}>

			<TouchableOpacity {...{ onPress }} activeOpacity={notTouchable ? 1 : 0.6}>
				<View style={styles.coinSelector}>

					<Token
						name={(token.symbol || '').toLowerCase() as TokenType}
						size={34}
					/>

					<View style={styles.coinSelectorTitles}>
						<View style={styles.coinSelectorTitlesUpper}>
							<Text
								type="p2"
								style={{ marginRight: 8 }}
								weight="extraBold"
							>
								{token.symbol}
							</Text>
							<Icon name="chevronDown" color="cta1" size={16} />
						</View>
						<View>
							<Text type="span" weight="semiBold">
								{getBalanceUSD()}
								{' '}
								({tokenBalanceFormat(tokenBalance, 6)} {token.symbol})
								{' '}
								{i18n.t('Components.TokenCard.available')}
							</Text>
						</View>
					</View>

				</View>
			</TouchableOpacity>

			<TokenInputInner
				symbol={token.symbol}
				isAmountValid={!invalidAmount}
				placeholder="0.00"
				autoFocus
				showSymbol
				marginBottom={8}
				amount={amount}
				onChangeText={onChangeText}
			/>

			<View style={styles.bottomRow}>
				{!!apy && <InterestTag apy={apy} />}
				{isMaxEnabled && (
					<TouchableOpacity onPress={onMaxPress} style={styles.tokenCardMaxButton}>
						<Icon name="sparkleStroke" size={16} color="cta1" />
						<Text type="a" color="cta1" style={styles.tokenCardMaxButtonText}>
							Max
						</Text>
					</TouchableOpacity>
				)}
			</View>

		</View>
	);
};

export default TokenCard;
