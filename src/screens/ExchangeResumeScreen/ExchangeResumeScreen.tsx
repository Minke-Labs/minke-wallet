import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import { Svg, Path } from 'react-native-svg';
import { ParaswapToken } from '@models/token';
import { BasicLayout } from '@layouts';
import { TokenType } from '@styles';
import { Icon, Modal, Text, Token, ActivityIndicator, HapticButton, ModalReusables } from '@components';
import { tokenBalanceFormat } from '@helpers/utilities';
import { formatUnits } from 'ethers/lib/utils';
import GasOption from '../ExchangeScreen/GasSelector/GasOption/GasOption';
import useExchangeResumeScreen from './ExchangeResumeScreen.hooks';

const TokenDetail = ({
	token,
	amount,
	usdAmount
}: {
	token: ParaswapToken;
	amount: string;
	usdAmount: number | undefined;
}) => (
	<View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', padding: 16 }}>
		<View style={{ borderRadius: 50, borderWidth: 2, borderColor: 'rgba(98, 126, 234, 0.2)', marginRight: 8 }}>
			<Token size={34} name={token.symbol.toLowerCase() as TokenType} glow />
		</View>
		<View>
			{usdAmount ? (
				<Text type="p2" weight="extraBold" color="text2">
					${tokenBalanceFormat(usdAmount, 4)}
				</Text>
			) : (
				<ActivityIndicator />
			)}
			<Text type="a" weight="medium" color="text2">
				{amount} {token.symbol}
			</Text>
		</View>
	</View>
);

const ExchangeResumeScreen = () => {
	const {
		styles,
		navigation,
		priceQuote,
		from,
		to,
		colors,
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
		gasless
	} = useExchangeResumeScreen();

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
								Exchange Resume
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
								<Svg width={24} height={23} viewBox="0 0 24 24" fill={colors.cta1}>
									<Path
										fill-rule="evenodd"
										clip-rule="evenodd"
										// eslint-disable-next-line max-len
										d="M10.9822 19.6603C11.4723 20.1604 12.2776 20.1604 12.7678 19.6603L17.2858 15.0501C17.6723 14.6556 18.3055 14.6492 18.6999 15.0358C19.0944 15.4224 19.1008 16.0555 18.7142 16.4499L14.1962 21.0602C12.9219 22.3605 10.8281 22.3605 9.55381 21.0602L5.03579 16.4499C4.64922 16.0555 4.65562 15.4224 5.05007 15.0358C5.44452 14.6492 6.07765 14.6556 6.46421 15.0501L10.9822 19.6603Z"
										fill={colors.cta1}
									/>
									<Path
										fill-rule="evenodd"
										clip-rule="evenodd"
										// eslint-disable-next-line max-len
										d="M11.875 22C11.3227 22 10.875 21.5523 10.875 21L10.875 8.5C10.875 7.94771 11.3227 7.5 11.875 7.5C12.4273 7.5 12.875 7.94771 12.875 8.5L12.875 21C12.875 21.5523 12.4273 22 11.875 22ZM11.875 5.875C11.3227 5.875 10.875 5.42728 10.875 4.875L10.875 3.125C10.875 2.57271 11.3227 2.125 11.875 2.125C12.4273 2.125 12.875 2.57271 12.875 3.125L12.875 4.875C12.875 5.42728 12.4273 5.875 11.875 5.875Z"
										fill={colors.cta1}
									/>
								</Svg>
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
										Rate fixed for:
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
									Rate
								</Text>
								<Text type="p2" weight="extraBold" color="text2">
									{exchangeSummary()}
								</Text>
							</View>

							<View style={styles.summaryRow}>
								<Text type="a" weight="medium" color="text3">
									Swapping via
								</Text>
								<Text type="p2" weight="extraBold" color="text2">
									{exchangeName}
								</Text>
							</View>
						</Card.Content>
					</Card>

					<View style={{ display: gasless ? 'none' : 'flex' }}>
						{exchange.value.gas && <GasOption type={gas.type} disabled />}
					</View>

					<View style={{ marginBottom: 32 }} />

					<View
						style={{
							marginTop: 'auto',
							marginBottom: 16
						}}
					>
						{priceQuote &&
							(loading ? <ActivityIndicator /> : <HapticButton title="Exchange" onPress={onSuccess} />)}
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
		</>
	);
};

export default ExchangeResumeScreen;
