import React from 'react';
import { useLanguage } from '@hooks';
import { numberFormat, tokenBalanceFormat } from '@helpers/utilities';
import View from '@src/components/View/View';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import Token from '@src/components/Token/Token';
import Touchable from '@src/components/Touchable/Touchable';
import { CoinSelectorProps, TitlesProps } from './CoinSelector.types';

const NoTokenIcon: React.FC<{ inline: boolean }> = ({ inline }) => (
	<View round={inline ? 28 : 40} bgc="background6" main="center" cross="center">
		<Icon name="dollar" color="cta1" size={30} />
	</View>
);

const Titles: React.FC<TitlesProps> = ({ token, inline, notTouchable = false }) => {
	const { i18n } = useLanguage();
	const { balance = '0', balanceUSD = 0, symbol, balanceAvailable, balanceAvailableUSD } = token;
	return (
		<>
			<View row cross="center">
				<Text type="p2" style={{ marginRight: inline ? 4 : 8 }} weight="extraBold">
					{symbol}
				</Text>
				{!notTouchable && <Icon name="chevronDown" color="cta1" size={16} />}
			</View>
			<View>
				<Text type="span" weight="semiBold">
					{numberFormat(balanceAvailableUSD || balanceUSD)} (
					{tokenBalanceFormat(balanceAvailable || balance, 6)} {symbol}){' '}
					{!inline && i18n.t('Components.TokenCard.available')}
				</Text>
			</View>
		</>
	);
};

const TitlesEmpty = () => {
	const { i18n } = useLanguage();
	return (
		<View row cross="center">
			<Text type="p2" weight="medium">
				{i18n.t('Components.TokenCard.choose_token')}
			</Text>
			<View mr="xxxs" />
			<Icon name="chevronDown" color="cta1" size={16} />
		</View>
	);
};

const CoinSelector: React.FC<CoinSelectorProps> = ({ onPress, notTouchable, token, inline = false }) => (
	<Touchable onPress={onPress} opacity={notTouchable ? 1 : 0.6}>
		<View row mb="xs" cross="center">
			{token ? <Token token={token} size={inline ? 28 : 40} /> : <NoTokenIcon {...{ inline }} />}

			<View
				main="space-between"
				ml={inline ? 'xxs' : 'xs'}
				row={inline}
				flex1={inline}
				cross={inline ? 'center' : 'flex-start'}
			>
				{token ? <Titles {...{ token, inline, notTouchable }} /> : <TitlesEmpty />}
			</View>
		</View>
	</Touchable>
);

export default CoinSelector;
