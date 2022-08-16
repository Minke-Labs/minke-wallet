import React from 'react';
import { View, Keyboard, TouchableOpacity } from 'react-native';
import { useTheme, useLanguage, useKeyboard } from '@hooks';
import { debounce } from 'lodash';
import { BasicLayout } from '@layouts';
import {
	Button,
	ModalBase,
	ModalReusables,
	Header,
	GasSelector,
	TokenCard,
	BlankStates
} from '@components';
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
	const keyboardVisible = useKeyboard();
	RNUxcam.tagScreenName('ExchangeScreen');

	if (fromToken === undefined) return <BlankStates.Exchange />;

	return (
		<>
			<BasicLayout>
				<TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
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

					<View style={{ display: keyboardVisible ? 'none' : 'flex' }}>
						<View style={{ marginBottom: 24, display: gasless ? 'none' : 'flex' }}>
							<GasSelector />
						</View>

						<View style={{ marginHorizontal: 16 }}>
							{!enoughForGas && (
								<Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />
							)}
						</View>
					</View>

					<View style={styles.buttonBox}>
						<Button
							title={i18n.t('ExchangeScreen.review')}
							onPress={goToExchangeResume}
							disabled={!canSwap()}
						/>
					</View>
					<KeyboardSpacer />
				</TouchableOpacity>
			</BasicLayout>

			<ModalBase isVisible={searchVisible} onDismiss={hideModal}>
				<ModalReusables.SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={ownedTokens}
					showOnlyOwnedTokens={showOnlyOwnedTokens}
					selected={[fromToken?.symbol?.toLowerCase(), toToken?.symbol?.toLowerCase()]}
				/>
			</ModalBase>
			<ModalBase isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</ModalBase>
		</>
	);
};

export default ExchangeScreen;
