import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { numberFormat } from '@helpers/utilities';
import { TokenCardProps } from './TokenCard.types';
import { useTokenCard } from './TokenCard.hooks';
import { makeStyles } from './TokenCard.styles';
import MaxButton from '../MaxButton/MaxButton';
import CoinSelector from '../CoinSelector/CoinSelector';
import InterestBanner from '../InterestBanner/InterestBanner';
import TokenInputInner from '../TokenInputInner/TokenInputInner';

const TokenCard: React.FC<TokenCardProps> = ({
	token,
	tokens,
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
	const { amount, onChangeText, onMaxPress, isMaxEnabled, invalidAmount } = useTokenCard({
		balance,
		updateQuotes: updateQuotes!,
		token: token!,
		conversionAmount,
		disableMax
	});

	const getBalanceUSD = () => {
		if (token && tokens?.length > 0) {
			return numberFormat(tokens.filter((item) => item.symbol === token?.symbol)[0].balanceUSD) ?? '';
		}
		return '$0';
	};

	return (
		<View style={styles.container}>

			<CoinSelector
				balanceUSD={getBalanceUSD()}
				tokenBalance={tokenBalance}
				token={token!}
				onPress={onPress!}
				notTouchable={notTouchable}
			/>

			<TokenInputInner
				symbol={token ? token.symbol : ''}
				isAmountValid={!invalidAmount}
				placeholder="0.00"
				autoFocus
				showSymbol
				marginBottom={8}
				amount={amount}
				onChangeText={onChangeText}
			/>

			<View style={styles.bottomRow}>
				{!!apy && <InterestBanner token apy={apy} />}
				{isMaxEnabled && <MaxButton onPress={onMaxPress} />}
			</View>

		</View>
	);
};

export default TokenCard;
