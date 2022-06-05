import React from 'react';
import { View } from 'react-native';
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
	tokenBalance,
	exchange = false,
	noMax = false,
	noInvalid = false
}) => {
	const styles = makeStyles();
	const { amount, onChangeText, onMaxPress, isMaxEnabled, invalidAmount } = useTokenCard({
		balance,
		updateQuotes: updateQuotes!,
		token: token!,
		conversionAmount,
		disableMax
	});

	const getBalanceUSD = () => {
		if (token && tokens && tokens.length > 0) {
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
				inline={exchange}
			/>

			<View
				style={exchange && {
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<TokenInputInner
					symbol={token ? token.symbol : ''}
					isAmountValid={noInvalid ? true : !invalidAmount}
					placeholder="0.00"
					autoFocus
					showSymbol
					amount={amount}
					onChangeText={onChangeText}
					ghost={exchange}
					marginBottom={exchange ? 0 : 8}
				/>

				<View style={[styles.bottomRow, exchange && { marginBottom: 8 }]}>
					{!!apy && <InterestBanner token apy={apy} />}
					{isMaxEnabled && !noMax && <MaxButton onPress={onMaxPress} />}
				</View>
			</View>

		</View>
	);
};

export default TokenCard;
