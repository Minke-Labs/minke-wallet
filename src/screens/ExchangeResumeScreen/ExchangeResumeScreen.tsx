import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import { BasicLayout } from '@layouts';
import { Icon, Modal, Text, ActivityIndicator, HapticButton, ModalReusables } from '@components';
import { useLanguage, useTheme } from '@hooks';
import { formatUnits } from 'ethers/lib/utils';
import { makeStyles } from './ExchangeResume.styles';
import GasOption from '../ExchangeScreen/GasSelector/GasOption/GasOption';
import useExchangeResumeScreen from './ExchangeResumeScreen.hooks';
import { TokenDetail } from './TokenDetail/TokenDetail';

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
		exchange,
		gas,
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
	return (
		<>
			<BasicLayout>
				<View style={styles.exchangeResumeContainer}>
					<View>
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => navigation.goBack()}
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<Icon name="arrowBackStroke" color="text7" size={24} />
							<Text type="h3" weight="extraBold">
								{i18n.t('ExchangeResumeScreen.exchange_resume')}
							</Text>
						</TouchableOpacity>
					</View>

					<Card style={styles.tokenCard}>
						{priceQuote ? (
							<TokenDetail
								token={from}
								amount={formatUnits(priceQuote.sellAmount, from.decimals)}
								usdAmount={fromFiatPrice}
							/>
						) : (
							<ActivityIndicator size={24} />
						)}

						<View style={styles.tokenCardDivisor}>
							<View style={styles.tokenCardDivisorBackground}>
								<Icon name="arrowDown" color="text7" size={24} />
							</View>
						</View>

						{priceQuote ? (
							<TokenDetail
								token={to}
								amount={formatUnits(priceQuote.buyAmount, to.decimals)}
								usdAmount={toFiatPrice}
							/>
						) : (
							<ActivityIndicator size={24} />
						)}

						{!loading && (
							<View style={styles.exchangeResumeRateFixedContainer}>
								<View style={styles.exchangeResumeRateFixedLabel}>
									<Text type="span" color="text2">
										{i18n.t('ExchangeResumeScreen.rate_fixed_for')}
									</Text>
								</View>
								<View style={styles.exchangeResumeRateFixed}>
									<View style={[styles.exchangeProgressBar, { width: count * 1.42222222 }]} />
									<View style={styles.timerContainer}>
										{count >= 0 && (
											<Text type="span" weight="bold">
												0:{count < 10 ? `0${count}` : count}
											</Text>
										)}
									</View>
								</View>
							</View>
						)}
					</Card>

					<Card style={styles.summaryCard}>
						<Card.Content>
							<View style={(styles.summaryRow, styles.marginBottom)}>
								<Text type="a" weight="medium" color="text3">
									{i18n.t('ExchangeResumeScreen.rate')}
								</Text>
								<Text type="p2" weight="extraBold" color="text2">
									{exchangeSummary()}
								</Text>
							</View>

							<View style={styles.summaryRow}>
								<Text type="a" weight="medium" color="text3">
									{i18n.t('ExchangeResumeScreen.swapping_via')}
								</Text>
								<Text type="p2" weight="extraBold" color="text2">
									{exchangeName}
								</Text>
							</View>
						</Card.Content>
					</Card>

					<View style={{ display: gasless || loading ? 'none' : 'flex' }}>
						{exchange.value.gas && <GasOption type={gas.type} disabled />}
					</View>

					<View style={{ marginBottom: 32 }} />

					<View style={{ marginTop: 'auto', marginBottom: 16 }}>
						{priceQuote &&
							(loading ? (
								<ActivityIndicator />
							) : (
								<HapticButton title={i18n.t('Components.Buttons.exchange')} onPress={onSuccess} />
							))}
					</View>
				</View>
			</BasicLayout>
			<Modal isVisible={visible} onDismiss={hideModal}>
				<TransactionWaitModal
					onDismiss={hideModal}
					fromToken={from}
					toToken={to}
					transactionHash={transactionHash}
				/>
			</Modal>
			<Modal isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</Modal>

			<Modal isVisible={!!blockchainError} onDismiss={() => setBlockchainError(false)}>
				{blockchainError && (
					<ModalReusables.Error
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setBlockchainError(false)}
						showHeader
					/>
				)}
			</Modal>
		</>
	);
};

export default ExchangeResumeScreen;
