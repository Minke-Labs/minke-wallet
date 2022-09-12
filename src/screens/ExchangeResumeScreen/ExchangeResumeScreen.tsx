import React from 'react';
import { Text, Header, HapticButton, Paper, ModalBase, ModalReusables, View } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage, useTheme } from '@hooks';
import { formatUnits } from 'ethers/lib/utils';
import RNUxcam from 'react-native-ux-cam';
import { os } from '@styles';
import DirectionButton from '../ExchangeScreen/DirectionButton/DirectionButton';
import useExchangeResumeScreen from './ExchangeResumeScreen.hooks';
import { TokenDetail } from './TokenDetail/TokenDetail';
import { Rate } from './Rate/Rate';
import { GasSelected } from './GasSelected/GasSelected';

const ExchangeResumeScreen = () => {
	RNUxcam.tagScreenName('ExchangeResumeScreen');
	const {
		priceQuote,
		from,
		to,
		loading,
		count,
		exchangeSummary,
		exchangeName,
		error,
		setError,
		onSuccess,
		fromFiatPrice,
		toFiatPrice,
		gasless,
		blockchainError,
		setBlockchainError
	} = useExchangeResumeScreen();
	const { i18n } = useLanguage();
	const { colors } = useTheme();

	return (
		<>
			<BasicLayout>
				<Header title={i18n.t('ExchangeResumeScreen.exchange_resume')} marginBottom={36} />

				<Paper mb="s" m="xs" mh="xs">
					<View
						row
						main="center"
						cross="center"
						style={{
							borderBottomWidth: 1,
							borderBottomColor: colors.background1
						}}
					>
						<View
							flex1
							h="100%"
							pt="s"
							cross="center"
							pb="xs"
							style={{
								borderRightWidth: 1,
								borderRightColor: colors.background1
							}}
						>
							<TokenDetail
								token={from}
								amount={(priceQuote && formatUnits(priceQuote.sellAmount, from.decimals)) || '0'}
								usdAmount={fromFiatPrice}
								loading={!priceQuote}
							/>
						</View>

						<View flex1 pt="s" pb="xs" cross="center">
							<TokenDetail
								token={to}
								amount={(priceQuote && formatUnits(priceQuote.buyAmount, to.decimals)) || '0'}
								usdAmount={toFiatPrice}
								loading={!priceQuote}
							/>
						</View>

						<DirectionButton disabled right />
					</View>

					<View row pv="xs" main="center">
						<Text type="lSmall" weight="semiBold">
							{i18n.t('ExchangeResumeScreen.rate_fixed_for')}
						</Text>
						<View mr="xxs" />
						{!loading && <Rate count={count} />}
					</View>
				</Paper>

				<Paper mb="s" p="s" mh="xs">
					<View row main="space-between" mb="xs">
						<Text weight="semiBold" color="text3" type="lMedium">
							{i18n.t('ExchangeResumeScreen.rate')}
						</Text>
						<Text weight="bold" color="text2" type="tSmall">
							{exchangeSummary()}
						</Text>
					</View>

					<View row main="space-between">
						<Text weight="semiBold" color="text3" type="lMedium">
							{i18n.t('ExchangeResumeScreen.swapping_via')}
						</Text>
						<Text weight="bold" color="text2" type="tSmall">
							{exchangeName}
						</Text>
					</View>
				</Paper>

				{!gasless && <GasSelected />}

				<View mb="m" mh="xs" style={{ marginTop: os === 'android' ? undefined : 'auto' }}>
					<HapticButton title={i18n.t('Components.Buttons.exchange')} onPress={onSuccess} />
				</View>
			</BasicLayout>
			<ModalBase isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</ModalBase>
			<ModalBase isVisible={!!blockchainError} onDismiss={() => setBlockchainError(false)}>
				{blockchainError && (
					<ModalReusables.Error
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setBlockchainError(false)}
						showHeader
					/>
				)}
			</ModalBase>
		</>
	);
};

export default ExchangeResumeScreen;
