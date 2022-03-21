import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useTheme, useNavigation } from '@hooks';
import { BigNumber as BN } from 'bignumber.js';
import { fromBn } from 'evm-bn';
import { debounce } from 'lodash';
import { WelcomeLayout } from '@layouts';
import { Text, Button, Icon, Modal, ActivityIndicator } from '@components';
import { tokenBalanceFormat } from '@helpers/utilities';
import SearchTokens from './SearchTokens/SearchTokens';
import GasSelector from './GasSelector/GasSelector';
import TokenCard from './TokenCard/TokenCard';
import { makeStyles } from './ExchangeScreen.styles';
import Warning from './Warning/Warning';
import { useExchangeScreen } from './ExchangeScreen.hooks';

const ExchangeScreen = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const {
		fromToken,
		toToken,
		fromTokenBalance,
		toTokenBalance,
		fromConversionAmount,
		toConversionAmount,
		canChangeDirections,
		directionSwap,
		showModalFrom,
		showModalTo,
		hideModal,
		onTokenSelect,
		goToExchangeResume,
		canSwap,
		loadingPrices,
		searchVisible,
		showOnlyOwnedTokens,
		fromAmountRef,
		toAmountRef,
		updateFromQuotes,
		updateToQuotes,
		enoughForGas,
		ownedTokens,
		quote
	} = useExchangeScreen();

	const ExchangeSummary = useCallback(() => {
		if (fromToken && toToken) {
			if (quote) {
				const destQuantity = new BN(fromBn(quote.to[toToken.symbol], toToken.decimals));
				const sourceQuantity = new BN(fromBn(quote.from[fromToken.symbol], fromToken.decimals));
				const division = destQuantity.dividedBy(sourceQuantity).toPrecision(toToken.decimals);
				const destQuantityString = tokenBalanceFormat(division, 9);
				return (
					<Text type="span" weight="regular" color="text3">
						1 {fromToken.symbol} = {destQuantityString} {toToken.symbol}
					</Text>
				);
			}
			return (
				<>
					<Text type="span" weight="regular" color="text3">
						Fetching...
					</Text>
					<ActivityIndicator size={16} />
				</>
			);
		}
		return null;
	}, [quote]);

	// this view is needed to hide the keyboard if you press outside the inputs
	return (
		<>
			<WelcomeLayout>
				<View style={styles.header}>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" color="text7" size={24} />
					</TouchableOpacity>
				</View>
				<View style={styles.exchangeSection}>
					<View style={styles.exchangeHeadlineRow}>
						<Text type="h3" weight="extraBold">
							Exchange
						</Text>
						<ExchangeSummary />
					</View>
					<Card style={styles.tokenCard}>
						<TokenCard
							token={fromToken}
							onPress={showModalFrom}
							balance={fromTokenBalance}
							innerRef={fromAmountRef}
							updateQuotes={debounce(updateFromQuotes, 500)}
							conversionAmount={fromConversionAmount}
						/>

						<TouchableOpacity
							style={styles.tokenCardDivisor}
							onPress={directionSwap}
							disabled={!canChangeDirections}
						>
							<View style={styles.tokenCardDivisorBackground}>
								{loadingPrices ? (
									<ActivityIndicator />
								) : (
									<Icon name="arrowDown" size={24} color={canChangeDirections ? 'cta1' : 'cta2'} />
								)}
							</View>
						</TouchableOpacity>

						<TokenCard
							token={toToken}
							onPress={showModalTo}
							balance={toTokenBalance}
							innerRef={toAmountRef}
							updateQuotes={debounce(updateToQuotes, 500)}
							conversionAmount={toConversionAmount}
							disableMax
						/>
					</Card>
				</View>

				<GasSelector />

				<View style={[styles.exchangeSection, styles.exchangeButton]}>
					{!loadingPrices && !enoughForGas && <Warning label="Not enough balance for gas" />}

					{loadingPrices ? (
						<ActivityIndicator />
					) : (
						<Button title="Exchange" onPress={goToExchangeResume} disabled={!canSwap()} />
					)}
				</View>
			</WelcomeLayout>

			<Modal isVisible={searchVisible} onDismiss={hideModal}>
				<SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={ownedTokens}
					showOnlyOwnedTokens={showOnlyOwnedTokens}
					selected={[fromToken?.symbol?.toLowerCase(), toToken?.symbol?.toLowerCase()]}
				/>
			</Modal>
		</>
	);
};

export default ExchangeScreen;
