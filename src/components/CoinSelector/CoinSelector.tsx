import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguage, useTheme } from '@hooks';
import { numberFormat, tokenBalanceFormat } from '@helpers/utilities';
import { TokenType } from '@styles';
import { MinkeToken } from '@models/token';
import styles from './CoinSelector.styles';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Token from '../Token/Token';
import { CoinSelectorProps } from './CoinSelector.types';

const NoTokenIcon = () => {
	const { colors } = useTheme();
	return (
		<View style={[styles.noTokenIcon, { backgroundColor: colors.background6 }]}>
			<Icon name="dollarStroke" color="cta1" size={30} />
		</View>
	);
};

interface TitlesProps {
	token: MinkeToken;
	inline?: boolean;
}

const Titles: React.FC<TitlesProps> = ({ token, inline }) => {
	const { i18n } = useLanguage();
	const { balance = '0', balanceUSD = 0, symbol } = token;
	return (
		<>
			<View style={styles.titlesUpper}>
				<Text type="p2" style={{ marginRight: inline ? 4 : 8 }} weight="extraBold">
					{symbol}
				</Text>
				<Icon name="chevronDown" color="cta1" size={16} />
			</View>
			<View>
				<Text type="span" weight="semiBold">
					{numberFormat(balanceUSD)} ({tokenBalanceFormat(balance, 6)} {symbol}){' '}
					{!inline && i18n.t('Components.TokenCard.available')}
				</Text>
			</View>
		</>
	);
};

const TitlesEmpty = () => {
	const { i18n } = useLanguage();
	return (
		<View
			style={{
				height: '100%',
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Text type="p2" weight="medium" style={{ marginRight: 4 }}>
				{i18n.t('Components.TokenCard.choose_token')}
			</Text>
			<Icon name="chevronDown" color="cta1" size={16} />
		</View>
	);
};

const CoinSelector: React.FC<CoinSelectorProps> = ({ onPress, notTouchable, token, inline = false }) => (
	<TouchableOpacity {...{ onPress }} activeOpacity={notTouchable ? 1 : 0.6}>
		<View style={styles.container}>
			{token ? (
				<Token name={(token.symbol || '').toLowerCase() as TokenType} size={inline ? 28 : 40} />
			) : (
				<NoTokenIcon />
			)}

			<View
				style={[
					styles.titlesContainer,
					{
						marginLeft: inline ? 8 : 16
					},
					inline && {
						flexDirection: 'row',
						alignItems: 'center',
						flex: 1
					}
				]}
			>
				{token ? <Titles {...{ token, inline }} /> : <TitlesEmpty />}
			</View>
		</View>
	</TouchableOpacity>
);

export default CoinSelector;
