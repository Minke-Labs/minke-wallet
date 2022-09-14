import React from 'react';
import View from '@src/components/View/View';
import TokenInputInner from '@src/components/TokenInputInner/TokenInputInner';
import CurrencySelector from '@src/components/CurrencySelector/CurrencySelector';
import Touchable from '@src/components/Touchable/Touchable';
import { FiatCardProps } from './FiatCard.types';
import { useFiatCard } from './FiatCard.hooks';

const FiatCard: React.FC<FiatCardProps> = ({
	currency,
	onPress,
	updateQuotes,
	conversionAmount = '',
	notTouchable = false,
	disableAmountValidation = false,
	disableInput = false,
	autoFocus = true
}) => {
	const { amount, onChangeText, invalidAmount } = useFiatCard({
		updateQuotes,
		conversionAmount,
		currency
	});

	return (
		<Touchable onPress={onPress} w="100%">

			<CurrencySelector
				currency={currency}
				onPress={onPress!}
				notTouchable={notTouchable}
			/>

			<View row main="space-between" cross="center">
				<TokenInputInner
					symbol={currency?.name || ''}
					isAmountValid={disableAmountValidation || !invalidAmount}
					placeholder="0.00"
					autoFocus={autoFocus}
					showSymbol
					amount={amount}
					onChangeText={onChangeText}
					ghost
					marginBottom={0}
					editable={!disableInput}
				/>
			</View>

		</Touchable>
	);
};

export default FiatCard;
