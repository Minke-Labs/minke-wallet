import React from 'react';
import { View } from 'react-native';
import { Text, Header, HapticButton, Paper, ModalBase, ModalReusables } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage, useTheme } from '@hooks';
import { formatUnits } from 'ethers/lib/utils';
import RNUxcam from 'react-native-ux-cam';
import DirectionButton from '../ExchangeScreen/DirectionButton/DirectionButton';
import useExchangeResumeScreen from './ExchangeResumeScreen.hooks';
import { TokenDetail } from './TokenDetail/TokenDetail';
import { makeStyles } from './ExchangeResumeScreen.styles';
import { Rate } from './Rate/Rate';
import { GasSelected } from './GasSelected/GasSelected';

const ExchangeResumeScreen = () => {
	const {
		priceQuote,
		from,
		to,
		loading,
		count,
		exchangeSummary,
		exchangeName,
		visible,
		hideModal,
		transactionHash,
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
	const styles = makeStyles(colors);
	RNUxcam.tagScreenName('ExchangeResumeScreen');

	return (
		<>
			<BasicLayout>
				<Header title={i18n.t('ExchangeResumeScreen.exchange_resume')} marginBottom={36} />

				<Paper mb="s" m="xs" mh="xs">
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
						{!loading && <Rate count={count} />}
					</View>
				</Paper>

				<Paper mb="s" p="s" m="xs" mh="xs">
					<View style={styles.infoTop}>
						<Text weight="semiBold" color="text3" type="lMedium">
							{i18n.t('ExchangeResumeScreen.rate')}
						</Text>
						<Text weight="bold" color="text2" type="tSmall">
							{exchangeSummary()}
						</Text>
					</View>
					<View style={styles.infoBottom}>
						<Text weight="semiBold" color="text3" type="lMedium">
							{i18n.t('ExchangeResumeScreen.swapping_via')}
						</Text>
						<Text weight="bold" color="text2" type="tSmall">
							{exchangeName}
						</Text>
					</View>
				</Paper>

				{!gasless && <GasSelected />}

				<View style={styles.haptic}>
					<HapticButton title={i18n.t('Components.Buttons.exchange')} onPress={onSuccess} />
				</View>
			</BasicLayout>

			<ModalBase isVisible={visible} onDismiss={hideModal}>
				<ModalReusables.TransactionWait
					onDismiss={hideModal}
					fromToken={from}
					toToken={to}
					transactionHash={transactionHash}
				/>
			</ModalBase>
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
