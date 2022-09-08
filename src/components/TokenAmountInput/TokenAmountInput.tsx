import React from 'react';
import { useLanguage } from '@hooks';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Touchable from '@src/components/Touchable/Touchable';
import TokenInputInner from '@src/components/TokenInputInner/TokenInputInner';
import { TokenAmountInputProps } from './TokenAmountInput.types';
import { useTokenAmountInput } from './TokenAmountInput.hooks';

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({
	symbol,
	amount,
	isAmountValid = true,
	placeholder,
	autoFocus = false,
	onAmountChange,
	onNumberAmountChange,
	onMaxPress,
	onTypeChange
}) => {
	const { onChangeText, showSymbol, setShowSymbol } = useTokenAmountInput({
		amount,
		onAmountChange,
		onNumberAmountChange,
		onTypeChange
	});
	const { i18n } = useLanguage();
	return (
		<View mb="xs">
			<TokenInputInner
				{...{
					symbol,
					amount,
					isAmountValid,
					placeholder,
					autoFocus,
					showSymbol,
					onChangeText
				}}
			/>

			<View
				h={40}
				row
				main="flex-end"
				cross="center"
			>
				<Touchable onPress={() => !!onMaxPress && onMaxPress(showSymbol)}>
					<Text type="a" weight="medium" color="text7">
						{i18n.t('Components.TokenAmountInput.send_max')}
					</Text>
				</Touchable>
				<View mr="xxs" />
				<Touchable row onPress={() => setShowSymbol(!showSymbol)}>
					<Icon name="tradeStroke" color="text7" size={16} />
					<View mr="xxxs" />
					<Text type="a" color="text7" weight="medium">
						{!showSymbol ? symbol : 'USD'}
					</Text>
				</Touchable>
			</View>
		</View>
	);
};

export default TokenAmountInput;
