import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguage, useTheme } from '@hooks';
import { tokenBalanceFormat } from '@helpers/utilities';
import { TokenType } from '@styles';
import { ParaswapToken } from '@models/token';
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
	token: ParaswapToken;
	balanceUSD: string;
	tokenBalance: string;
	inline?: boolean;
}

const Titles: React.FC<TitlesProps> = ({ token, balanceUSD, tokenBalance, inline }) => {
	const { i18n } = useLanguage();
	return (
		<>
			<View style={styles.titlesUpper}>
				<Text
					type="p2"
					style={{ marginRight: inline ? 4 : 8 }}
					weight="extraBold"
				>
					{token.symbol}
				</Text>
				<Icon name="chevronDown" color="cta1" size={16} />
			</View>
			<View>
				<Text type="span" weight="semiBold">
					{balanceUSD}
					{' '}
					({tokenBalanceFormat(tokenBalance, 6)} {token.symbol})
					{' '}
					{!inline && i18n.t('Components.TokenCard.available')}
				</Text>
			</View>
		</>
	);
};

const TitlesEmpty = () => {
	const { i18n } = useLanguage();
	return (
		<View style={{
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

const CoinSelector: React.FC<CoinSelectorProps> = ({
	onPress,
	notTouchable,
	token,
	balanceUSD,
	tokenBalance,
	inline = false
}) => (
	<TouchableOpacity {...{ onPress }} activeOpacity={notTouchable ? 1 : 0.6}>
		<View style={styles.container}>

			{
				!token ? (
					<NoTokenIcon />
				) : (
					<Token
						name={(token.symbol || '').toLowerCase() as TokenType}
						size={inline ? 28 : 40}
					/>
				)
			}

			<View style={[styles.titlesContainer, {
				marginLeft: inline ? 8 : 16
			}, inline && {
				flexDirection: 'row',
				alignItems: 'center',
				flex: 1
			}]}
			>
				{ !token ? <TitlesEmpty /> : <Titles {...{ token, balanceUSD, tokenBalance, inline }} /> }
			</View>

		</View>
	</TouchableOpacity>
);

export default CoinSelector;
