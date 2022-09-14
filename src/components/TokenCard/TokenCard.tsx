import React from 'react';
import View from '../View/View';
import { TokenCardProps } from './TokenCard.types';
import { useTokenCard } from './TokenCard.hooks';
import MaxButton from '../MaxButton/MaxButton';
import CoinSelector from '../CoinSelector/CoinSelector';
import Touchable from '../Touchable/Touchable';
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
	disableInput = false,
	autoFocus = true
}) => {
	const { amount, onChangeText, onMaxPress, isMaxEnabled, invalidAmount } = useTokenCard({
		updateQuotes,
		token,
		conversionAmount,
		disableMax
	});

	return (
		<View>
			<Touchable onPress={onPress} w="100%">
				<CoinSelector
					token={token}
					onPress={onPress!}
					notTouchable={notTouchable}
					inline={exchange}
				/>
			</Touchable>

			<View row={exchange}>
				<TokenInputInner
					symbol={token ? token.symbol : ''}
					isAmountValid={disableAmountValidation || !invalidAmount}
					placeholder="0.00"
					autoFocus={autoFocus}
					showSymbol
					amount={amount}
					onChangeText={onChangeText}
					ghost={exchange}
					marginBottom={exchange ? 0 : 8}
					editable={!disableInput}
				/>

				<View
					row
					main="space-between"
					cross="center"
					mt="xxxs"
					mb={exchange ? 'xxxs' : 'zero'}
				>
					{!!apy && <InterestBanner token apy={apy} />}
					{isMaxEnabled && <MaxButton onPress={onMaxPress} />}
				</View>
			</View>
		</View>
	);
};

export default TokenCard;
