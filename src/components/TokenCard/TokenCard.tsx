import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TokenCardProps } from './TokenCard.types';
import { useTokenCard } from './TokenCard.hooks';
import { makeStyles } from './TokenCard.styles';
import MaxButton from '../MaxButton/MaxButton';
import CoinSelector from '../CoinSelector/CoinSelector';
import InterestBanner from '../InterestBanner/InterestBanner';
import TokenInputInner from '../TokenInputInner/TokenInputInner';

const TokenCard: React.FC<TokenCardProps> = ({
	token,
	onPress,
	disableMax = false,
	updateQuotes,
	conversionAmount = '',
	notTouchable = false,
	apy,
	exchange = false,
	disableAmountValidation = false,
	disableInput = false
}) => {
	const styles = makeStyles();
	const { amount, onChangeText, onMaxPress, isMaxEnabled, invalidAmount } = useTokenCard({
		updateQuotes,
		token,
		conversionAmount,
		disableMax
	});

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<CoinSelector
				token={token}
				onPress={onPress!}
				notTouchable={notTouchable}
				inline={exchange}
			/>

			<View
				style={
					exchange && {
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}
				}
			>
				<TokenInputInner
					symbol={token ? token.symbol : ''}
					isAmountValid={disableAmountValidation || !invalidAmount}
					placeholder="0.00"
					autoFocus
					showSymbol
					amount={amount}
					onChangeText={onChangeText}
					ghost={exchange}
					marginBottom={exchange ? 0 : 8}
					editable={!disableInput}
				/>

				<View style={[styles.bottomRow, exchange && { marginBottom: 8 }]}>
					{!!apy && <InterestBanner token apy={apy} />}
					{isMaxEnabled && <MaxButton onPress={onMaxPress} />}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default TokenCard;
