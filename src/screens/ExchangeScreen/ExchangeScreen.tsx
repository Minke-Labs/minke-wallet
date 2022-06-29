import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import { BasicLayout } from '@layouts';
import { Button, Modal, ActivityIndicator, ModalReusables, Header, GasSelector, TokenCard } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNUxcam from 'react-native-ux-cam';
import { makeStyles } from './ExchangeScreen.styles';
import Warning from './Warning/Warning';
import { useExchangeScreen } from './ExchangeScreen.hooks';
import DirectionButton from './DirectionButton/DirectionButton';

const ExchangeScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const {
		fromToken,
		toToken,
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
		updateFromQuotes,
		updateToQuotes,
		enoughForGas,
		ownedTokens,
		error,
		setError,
		gasless
	} = useExchangeScreen();
	const { i18n } = useLanguage();
	RNUxcam.tagScreenName('ExchangeScreen');

	return (
		<>
			<BasicLayout>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<>
						<Header title={i18n.t('ExchangeScreen.exchange')} marginBottom={36} />

						<View style={styles.container}>
							<View style={styles.top}>
								<TokenCard
									updateQuotes={debounce(updateFromQuotes, 500)}
									conversionAmount={fromConversionAmount}
									token={fromToken}
									onPress={showModalFrom}
									exchange
								/>
							</View>
							<View style={styles.bottom}>
								<TokenCard
									updateQuotes={debounce(updateToQuotes, 500)}
									conversionAmount={toConversionAmount}
									token={toToken}
									onPress={showModalTo}
									disableMax
									exchange
									disableAmountValidation
								/>
							</View>

							<DirectionButton
								onPress={directionSwap}
								loading={loadingPrices}
								disabled={!canChangeDirections}
							/>
						</View>

						<View style={{ marginBottom: 24, display: gasless ? 'none' : 'flex' }}>
							<GasSelector />
						</View>

						<View style={{ marginHorizontal: 16 }}>
							{!loadingPrices && !enoughForGas && (
								<Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />
							)}
						</View>

						<View style={styles.buttonBox}>
							{loadingPrices ? (
								<ActivityIndicator />
							) : (
								<Button
									title={i18n.t('ExchangeScreen.review')}
									onPress={goToExchangeResume}
									disabled={!canSwap()}
								/>
							)}
						</View>
						<KeyboardSpacer />
					</>
				</TouchableWithoutFeedback>
			</BasicLayout>

			<Modal isVisible={searchVisible} onDismiss={hideModal}>
				<ModalReusables.SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={ownedTokens}
					showOnlyOwnedTokens={showOnlyOwnedTokens}
					selected={[fromToken?.symbol?.toLowerCase(), toToken?.symbol?.toLowerCase()]}
				/>
			</Modal>
			<Modal isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</Modal>
		</>
	);
};

export default ExchangeScreen;
