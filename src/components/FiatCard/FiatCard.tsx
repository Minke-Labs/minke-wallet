import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FiatCardProps } from './FiatCard.types';
import { useFiatCard } from './FiatCard.hooks';
import { makeStyles } from './FiatCard.styles';
import TokenInputInner from '../TokenInputInner/TokenInputInner';
import CurrencySelector from '../CurrencySelector/CurrencySelector';

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
	const styles = makeStyles();
	const { amount, onChangeText, invalidAmount } = useFiatCard({
		updateQuotes,
		conversionAmount,
		currency
	});

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<CurrencySelector currency={currency} onPress={onPress!} notTouchable={notTouchable} />

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
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
		</TouchableOpacity>
	);
};

export default FiatCard;
