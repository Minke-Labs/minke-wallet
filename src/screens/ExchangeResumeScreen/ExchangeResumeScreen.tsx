import React from 'react';
import { View } from 'react-native';
import { Text, Header, HapticButton, Paper } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage, useTheme } from '@hooks';
import { formatUnits } from 'ethers/lib/utils';
import DirectionButton from '../ExchangeScreen/DirectionButton/DirectionButton';
import useExchangeResumeScreen from './ExchangeResumeScreen.hooks';
import { TokenDetail } from './TokenDetail/TokenDetail';
import { makeStyles } from './ExchangeResume.styles';
import { Rate } from './Rate/Rate';

const ExchangeResumeScreen = () => {
	const {
		navigation,
		priceQuote,
		from,
		to,
		loading,
		count,
		exchangeSummary,
		exchangeName,
		// exchange,
		// gas,
		visible,
		hideModal,
		transactionHash,
		error,
		setError,
		onSuccess,
		fromFiatPrice,
		toFiatPrice,
		// gasless,
		blockchainError,
		setBlockchainError
	} = useExchangeResumeScreen();
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<BasicLayout>
			<Header
				title={i18n.t('ExchangeResumeScreen.exchange_resume')}
				marginBottom={36}
			/>

			<Paper marginBottom={24}>
				<View style={styles.container}>
					<View style={styles.containerLeft}>
						<TokenDetail
							token={from}
							amount={(priceQuote && formatUnits(priceQuote.sellAmount, from.decimals)) || '0'}
							usdAmount={fromFiatPrice}
							loading={!priceQuote}
						/>
					</View>
					<View style={styles.containerRight}>
						<TokenDetail
							token={to}
							amount={(priceQuote && formatUnits(priceQuote.buyAmount, to.decimals)) || '0'}
							usdAmount={toFiatPrice}
							loading={!priceQuote}
						/>
					</View>
					<DirectionButton disabled right />
				</View>
				<View style={styles.containerBottom}>
					<Text type="lSmall" weight="semiBold" style={{ marginRight: 8 }}>
						{i18n.t('ExchangeResumeScreen.rate_fixed_for')}
					</Text>
					<Rate count={count} />
				</View>
			</Paper>

			<Paper marginBottom={24} padding={24}>
				<View style={styles.infoTop}>
					<Text weight="semiBold" color="text3" type="lMedium">Rate</Text>
					<Text weight="bold" color="text2" type="tSmall">2000 DAI per 1 ETH</Text>
				</View>
				<View style={styles.infoBottom}>
					<Text weight="semiBold" color="text3" type="lMedium">Swapping via</Text>
					<Text weight="bold" color="text2" type="tSmall">Uniswap v2 🦄</Text>
				</View>
			</Paper>

			<Paper padding={16}>
				<Text>ExchangeResumeScreen</Text>
				<Text>ExchangeResumeScreen</Text>
			</Paper>

			<View style={{ marginTop: 'auto', marginBottom: 32, marginHorizontal: 16 }}>
				<HapticButton
					title={i18n.t('Components.Buttons.exchange')}
					onPress={() => null}
				/>
			</View>
		</BasicLayout>
	);
};

export default ExchangeResumeScreen;
