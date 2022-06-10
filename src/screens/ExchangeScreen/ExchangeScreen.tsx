import React from 'react';
import {
	View,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import { BasicLayout } from '@layouts';
import {
	Button,
	Modal,
	ActivityIndicator,
	ModalReusables,
	Header,
	GasSelector,
	TokenCard
} from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import SearchTokens from '../../components/ModalReusables/SearchTokens/SearchTokens';
import { makeStyles } from './ExchangeScreen.styles';
import Warning from './Warning/Warning';
import { useExchangeScreen } from './ExchangeScreen.hooks';
import DirectionButton from './DirectionButton/DirectionButton';

const ExchangeScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	// const { depositableTokens } = useTokens();
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
		updateFromQuotes,
		enoughForGas,
		ownedTokens,
		error,
		setError,
		gasless
	} = useExchangeScreen();
	const { i18n } = useLanguage();

	return (
		<>
			<BasicLayout>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<>
						<Header title="Exchange" marginBottom={36} />

						<View style={styles.container}>
							<View style={styles.top}>
								<TokenCard
									balance={fromTokenBalance}
									updateQuotes={debounce(updateFromQuotes, 500)}
									conversionAmount={fromConversionAmount}
									token={fromToken!}
									onPress={showModalFrom}
									notTouchable={false}
									tokenBalance={fromTokenBalance}
									exchange
								/>
							</View>
							<View style={styles.bottom}>
								<TokenCard
									balance={toTokenBalance}
									updateQuotes={debounce(updateFromQuotes, 500)}
									conversionAmount={toConversionAmount}
									token={toToken!}
									notTouchable={false}
									onPress={showModalTo}
									tokenBalance={toTokenBalance}
									exchange
									noMax
									noInvalid
								/>
							</View>

							<DirectionButton
								onPress={directionSwap}
								loading={loadingPrices}
								disabled={!canChangeDirections}
							/>
						</View>

						<View style={{ marginBottom: 24 }}>
							{!gasless && <GasSelector />}
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
				<SearchTokens
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
